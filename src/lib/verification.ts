/**
 * Vision verification call — describes what is literally in a diagram image.
 * Runs BEFORE the marking call. Has no rubric or question context.
 */

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mark-exam`;
const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

export interface VerificationReport {
  isBlank: boolean;
  hasAxes: { horizontal: boolean; vertical: boolean };
  axesLabels: string[];
  curvesDetected: Array<{ description: string; hasLabel: boolean; label: string | null }>;
  textElements: string[];
  pointsLabelled: string[];
  completeness: "empty" | "sparse" | "partial" | "substantial" | "complete";
  rawDescription: string;
}

const VERIFICATION_SYSTEM = `You are an image describer. You will be shown an image that may or may not contain an economics diagram. Describe ONLY what you literally see. Do not interpret, do not be charitable, do not assume intent. If the image is blank, say so. If there are only a few marks, describe them precisely (e.g. 'a single curved line approximately 3cm long in the upper-left quadrant, no axes, no labels, no other elements'). Reply with JSON only:

{
  "isBlank": boolean,
  "hasAxes": { "horizontal": boolean, "vertical": boolean },
  "axesLabels": string[],
  "curvesDetected": [ { "description": string, "hasLabel": boolean, "label": string|null } ],
  "textElements": string[],
  "pointsLabelled": string[],
  "completeness": "empty"|"sparse"|"partial"|"substantial"|"complete",
  "rawDescription": string
}`;

export async function verifyDiagramImage(imageBase64: string): Promise<VerificationReport> {
  const messages = [
    { role: "system", content: VERIFICATION_SYSTEM },
    {
      role: "user",
      content: [
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
        { type: "text", text: "Describe exactly what you see in this image. Be literal and precise. Do not assume economic content that is not clearly present." },
      ],
    },
  ];

  const resp = await fetch(EDGE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: AUTH_HEADER },
    body: JSON.stringify({ messages, maxTokens: 1000 }),
  });

  if (!resp.ok) {
    console.error("Verification call failed:", resp.status);
    // Return a conservative default — treat as empty to prevent false positives
    return {
      isBlank: true,
      hasAxes: { horizontal: false, vertical: false },
      axesLabels: [],
      curvesDetected: [],
      textElements: [],
      pointsLabelled: [],
      completeness: "empty",
      rawDescription: "Verification call failed — treating as empty for safety.",
    };
  }

  const raw = await resp.text();
  try {
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }
    return JSON.parse(cleaned) as VerificationReport;
  } catch {
    console.error("Failed to parse verification JSON:", raw.substring(0, 500));
    return {
      isBlank: true,
      hasAxes: { horizontal: false, vertical: false },
      axesLabels: [],
      curvesDetected: [],
      textElements: [],
      pointsLabelled: [],
      completeness: "empty",
      rawDescription: `Parse failed: ${raw.substring(0, 200)}`,
    };
  }
}

/**
 * Create a human-readable summary of verification findings.
 */
export function formatVerificationFindings(report: VerificationReport): string[] {
  const findings: string[] = [];

  if (report.isBlank) {
    findings.push("✗ Image appears blank or empty");
    return findings;
  }

  findings.push(report.hasAxes.horizontal ? "✓ Horizontal axis detected" : "✗ No horizontal axis detected");
  findings.push(report.hasAxes.vertical ? "✓ Vertical axis detected" : "✗ No vertical axis detected");

  if (report.axesLabels.length > 0) {
    findings.push(`✓ Axis labels: ${report.axesLabels.join(", ")}`);
  } else {
    findings.push("✗ No axis labels detected");
  }

  if (report.curvesDetected.length > 0) {
    for (const curve of report.curvesDetected) {
      const labelInfo = curve.hasLabel ? `labelled "${curve.label}"` : "unlabelled";
      findings.push(`✓ Curve: ${curve.description} (${labelInfo})`);
    }
  } else {
    findings.push("✗ No curves detected");
  }

  if (report.textElements.length > 0) {
    findings.push(`✓ Text elements: ${report.textElements.join(", ")}`);
  }

  if (report.pointsLabelled.length > 0) {
    findings.push(`✓ Points labelled: ${report.pointsLabelled.join(", ")}`);
  } else {
    findings.push("✗ No labelled points detected");
  }

  findings.push(`Overall completeness: ${report.completeness}`);

  return findings;
}
