/**
 * Pre-flight image validation gates.
 * Runs client-side BEFORE any marking API call.
 */

export interface ValidationResult {
  passed: boolean;
  gate: "A" | "B" | "C" | null;
  message: string;
  inkRatio: number;
  needsConfirmation?: boolean;
  componentCount?: number;
}

/**
 * Load an image (base64 data URL or blob URL) into a canvas and return pixel data.
 */
async function loadImageToCanvas(imageSrc: string): Promise<{
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  data: Uint8ClampedArray;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve({ ctx, width: canvas.width, height: canvas.height, data: imageData.data });
    };
    img.onerror = () => reject(new Error("Failed to load image for validation"));
    img.src = imageSrc;
  });
}

/**
 * Determine the background colour by sampling corners.
 */
function detectBackground(data: Uint8ClampedArray, width: number, height: number): [number, number, number] {
  const corners = [
    0, // top-left
    (width - 1) * 4, // top-right
    (height - 1) * width * 4, // bottom-left
    ((height - 1) * width + width - 1) * 4, // bottom-right
  ];

  let r = 0, g = 0, b = 0;
  for (const idx of corners) {
    r += data[idx];
    g += data[idx + 1];
    b += data[idx + 2];
  }
  return [Math.round(r / 4), Math.round(g / 4), Math.round(b / 4)];
}

/**
 * Check if a pixel is "ink" (significantly different from background).
 */
function isInk(
  r: number, g: number, b: number,
  bgR: number, bgG: number, bgB: number,
  threshold = 30
): boolean {
  return Math.abs(r - bgR) > threshold || Math.abs(g - bgG) > threshold || Math.abs(b - bgB) > threshold;
}

/**
 * GATE A: Pixel content check — compute ink ratio.
 */
function gateA(
  data: Uint8ClampedArray, width: number, height: number,
  bgR: number, bgG: number, bgB: number
): { inkRatio: number; inkPixels: boolean[][] } {
  const totalPixels = width * height;
  let inkCount = 0;
  const inkPixels: boolean[][] = Array.from({ length: height }, () => new Array(width).fill(false));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (isInk(data[idx], data[idx + 1], data[idx + 2], bgR, bgG, bgB)) {
        inkCount++;
        inkPixels[y][x] = true;
      }
    }
  }

  return { inkRatio: inkCount / totalPixels, inkPixels };
}

/**
 * GATE B: Bounding box check.
 */
function gateB(
  inkPixels: boolean[][], width: number, height: number
): { bbWidth: number; bbHeight: number; bbWidthRatio: number; bbHeightRatio: number } {
  let minX = width, maxX = 0, minY = height, maxY = 0;
  let hasInk = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (inkPixels[y][x]) {
        hasInk = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasInk) return { bbWidth: 0, bbHeight: 0, bbWidthRatio: 0, bbHeightRatio: 0 };

  const bbW = maxX - minX + 1;
  const bbH = maxY - minY + 1;
  return { bbWidth: bbW, bbHeight: bbH, bbWidthRatio: bbW / width, bbHeightRatio: bbH / height };
}

/**
 * GATE C: Connected component count (8-connectivity flood fill).
 */
function gateC(inkPixels: boolean[][], width: number, height: number): number {
  const visited: boolean[][] = Array.from({ length: height }, () => new Array(width).fill(false));
  let componentCount = 0;

  const MIN_COMPONENT_SIZE = 10; // ignore tiny noise specs

  function floodFill(startX: number, startY: number): number {
    const stack: [number, number][] = [[startX, startY]];
    visited[startY][startX] = true;
    let size = 0;

    while (stack.length > 0) {
      const [cx, cy] = stack.pop()!;
      size++;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[ny][nx] && inkPixels[ny][nx]) {
            visited[ny][nx] = true;
            stack.push([nx, ny]);
          }
        }
      }
    }
    return size;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (inkPixels[y][x] && !visited[y][x]) {
        const size = floodFill(x, y);
        if (size >= MIN_COMPONENT_SIZE) componentCount++;
      }
    }
  }

  return componentCount;
}

/**
 * Run all three validation gates on an image.
 * Returns a result indicating whether the image passes pre-flight checks.
 */
export async function validateDiagramImage(imageSrc: string): Promise<ValidationResult> {
  try {
    const { data, width, height } = await loadImageToCanvas(imageSrc);
    const [bgR, bgG, bgB] = detectBackground(data, width, height);

    // GATE A: Ink ratio
    const { inkRatio, inkPixels } = gateA(data, width, height, bgR, bgG, bgB);

    if (inkRatio < 0.005) {
      return {
        passed: false,
        gate: "A",
        message: "Your canvas appears to be empty or nearly empty. Please draw your diagram before submitting.",
        inkRatio,
      };
    }

    if (inkRatio < 0.02) {
      return {
        passed: false,
        gate: "A",
        message: "Your diagram looks very sparse — are you sure you want to submit? You may receive 0 marks.",
        inkRatio,
        needsConfirmation: true,
      };
    }

    // GATE B: Bounding box
    const { bbWidthRatio, bbHeightRatio } = gateB(inkPixels, width, height);

    if (bbWidthRatio < 0.15 || bbHeightRatio < 0.15) {
      return {
        passed: false,
        gate: "B",
        message: "Your diagram is too small to be a complete economics diagram. Please draw across the canvas using axes that span most of the area.",
        inkRatio,
      };
    }

    // GATE C: Connected components
    const componentCount = gateC(inkPixels, width, height);

    if (componentCount < 3) {
      return {
        passed: false,
        gate: "C",
        message: "An economics diagram needs at least axes and one curve. Your submission has too few distinct elements.",
        inkRatio,
        componentCount,
      };
    }

    return { passed: true, gate: null, message: "Validation passed", inkRatio, componentCount };
  } catch (e) {
    // If validation itself fails, allow submission but log
    console.warn("Image validation failed, allowing submission:", e);
    return { passed: true, gate: null, message: "Validation skipped", inkRatio: 1 };
  }
}
