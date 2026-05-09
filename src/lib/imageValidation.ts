/**
 * Pre-flight image validation gates.
 * Runs client-side BEFORE any marking API call.
 * STRICT thresholds · zero tolerance for empty/near-empty submissions.
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
 * Determine the background colour by sampling corners and edges.
 */
function detectBackground(data: Uint8ClampedArray, width: number, height: number): [number, number, number] {
  const samplePoints = [
    0,
    (width - 1) * 4,
    (height - 1) * width * 4,
    ((height - 1) * width + width - 1) * 4,
    // Also sample mid-edges for better grid detection
    (Math.floor(width / 2)) * 4,
    ((height - 1) * width + Math.floor(width / 2)) * 4,
    (Math.floor(height / 2) * width) * 4,
    (Math.floor(height / 2) * width + width - 1) * 4,
  ];

  let r = 0, g = 0, b = 0, count = 0;
  for (const idx of samplePoints) {
    if (idx + 2 < data.length) {
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
      count++;
    }
  }
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

/**
 * Detect grid lines pattern. Returns true if pixel matches common grid colors.
 */
function isGridPixel(
  r: number, g: number, b: number,
  bgR: number, bgG: number, bgB: number
): boolean {
  // Grid lines are typically very light grey on white background
  // or very subtle variations from the background
  const diffR = Math.abs(r - bgR);
  const diffG = Math.abs(g - bgG);
  const diffB = Math.abs(b - bgB);

  // If background is white-ish (>220), grid lines are typically 200-240 range
  if (bgR > 220 && bgG > 220 && bgB > 220) {
    // Very light grey that's close to background = grid
    if (diffR < 40 && diffG < 40 && diffB < 40 && diffR > 5) {
      // Check if it's a uniform grey (grid lines are usually uniform)
      if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check if a pixel is "ink" (significantly different from background),
 * EXCLUDING grid line patterns.
 */
function isInk(
  r: number, g: number, b: number,
  bgR: number, bgG: number, bgB: number,
  threshold = 30
): boolean {
  // First exclude grid pixels
  if (isGridPixel(r, g, b, bgR, bgG, bgB)) return false;

  return Math.abs(r - bgR) > threshold || Math.abs(g - bgG) > threshold || Math.abs(b - bgB) > threshold;
}

/**
 * GATE A: Pixel content check · compute ink ratio (grid-subtracted).
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
 * Also tracks the largest component's span.
 */
function gateC(inkPixels: boolean[][], width: number, height: number): {
  componentCount: number;
  largestSpanWidthRatio: number;
  largestSpanHeightRatio: number;
} {
  const visited: boolean[][] = Array.from({ length: height }, () => new Array(width).fill(false));
  let componentCount = 0;
  let largestSpanWidth = 0;
  let largestSpanHeight = 0;

  const MIN_COMPONENT_SIZE = 10;

  function floodFill(startX: number, startY: number): { size: number; spanW: number; spanH: number } {
    const stack: [number, number][] = [[startX, startY]];
    visited[startY][startX] = true;
    let size = 0;
    let cMinX = startX, cMaxX = startX, cMinY = startY, cMaxY = startY;

    while (stack.length > 0) {
      const [cx, cy] = stack.pop()!;
      size++;
      if (cx < cMinX) cMinX = cx;
      if (cx > cMaxX) cMaxX = cx;
      if (cy < cMinY) cMinY = cy;
      if (cy > cMaxY) cMaxY = cy;

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
    return { size, spanW: cMaxX - cMinX + 1, spanH: cMaxY - cMinY + 1 };
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (inkPixels[y][x] && !visited[y][x]) {
        const { size, spanW, spanH } = floodFill(x, y);
        if (size >= MIN_COMPONENT_SIZE) {
          componentCount++;
          if (spanW > largestSpanWidth) largestSpanWidth = spanW;
          if (spanH > largestSpanHeight) largestSpanHeight = spanH;
        }
      }
    }
  }

  return {
    componentCount,
    largestSpanWidthRatio: width > 0 ? largestSpanWidth / width : 0,
    largestSpanHeightRatio: height > 0 ? largestSpanHeight / height : 0,
  };
}

/**
 * Get minimum required components based on total marks.
 */
function getMinComponents(totalMarks: number): number {
  if (totalMarks >= 12) return 8; // two-panel topics
  if (totalMarks >= 8) return 6;
  if (totalMarks >= 6) return 5;
  return 4; // 4-mark Foundation
}

/**
 * Run all three validation gates on an image.
 * Returns a result indicating whether the image passes pre-flight checks.
 */
export async function validateDiagramImage(imageSrc: string, totalMarks: number = 4): Promise<ValidationResult> {
  try {
    const { data, width, height } = await loadImageToCanvas(imageSrc);
    const [bgR, bgG, bgB] = detectBackground(data, width, height);

    // GATE A: Ink ratio (grid-subtracted)
    const { inkRatio, inkPixels } = gateA(data, width, height, bgR, bgG, bgB);

    // Hard reject: ink < 1%
    if (inkRatio < 0.01) {
      return {
        passed: false,
        gate: "A",
        message: "Your canvas appears to be empty or nearly empty. Please draw your diagram before submitting.",
        inkRatio,
      };
    }

    // Hard reject: ink < 3% (too sparse)
    if (inkRatio < 0.03) {
      return {
        passed: false,
        gate: "A",
        message: "Your diagram is too sparse to be marked. Please add axes, curves, and labels before submitting.",
        inkRatio,
      };
    }

    // GATE B: Bounding box · BOTH width AND height must be ≥ 20%
    const { bbWidthRatio, bbHeightRatio } = gateB(inkPixels, width, height);

    if (bbWidthRatio < 0.20 || bbHeightRatio < 0.20) {
      return {
        passed: false,
        gate: "B",
        message: "Your diagram is too small to be a complete economics diagram. Please draw across the canvas using axes that span most of the area.",
        inkRatio,
      };
    }

    // GATE C: Connected components (mark-tier aware)
    const { componentCount, largestSpanWidthRatio, largestSpanHeightRatio } = gateC(inkPixels, width, height);
    const minComponents = getMinComponents(totalMarks);

    if (componentCount < minComponents) {
      return {
        passed: false,
        gate: "C",
        message: `An economics diagram needs at least axes, curves, and labels. Your submission has too few distinct elements (${componentCount} detected, ${minComponents} required for a ${totalMarks}-mark question).`,
        inkRatio,
        componentCount,
      };
    }

    // NEW: At least ONE component must span > 25% of canvas width OR height
    if (largestSpanWidthRatio < 0.25 && largestSpanHeightRatio < 0.25) {
      return {
        passed: false,
        gate: "C",
        message: "No element in your diagram spans enough of the canvas. Draw axes and curves that use a significant portion of the available space.",
        inkRatio,
        componentCount,
      };
    }

    return { passed: true, gate: null, message: "Validation passed", inkRatio, componentCount };
  } catch (e) {
    // If validation itself fails, BLOCK submission for safety (was: allow)
    console.warn("Image validation failed, blocking submission:", e);
    return { passed: false, gate: "A", message: "Image validation failed · please redraw and resubmit.", inkRatio: 0 };
  }
}
