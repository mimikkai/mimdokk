import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export interface Tag {
  name: string;
  default: string | null;
}

/**
 * Extracts unique tags from a docx buffer.
 * @param buffer - The docx file buffer.
 * @returns Array of unique tag objects.
 */
export function extractTags(buffer: Buffer): Tag[] {
  const zip = new PizZip(buffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{", end: "}" },
  });

  const text = doc.getFullText();
  // Match {VAR} or {VAR|default}
  // Captures: 1=VAR, 2=default (optional)
  const regex = /{\s*([^}|]+?)\s*(?:\|\s*([^}]+?)\s*)?}/g;
  const tagsMap = new Map<string, Tag>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    const defaultValue = match[2] || null;

    // If tag already exists, keep the one with default value if current doesn't have one
    // Or just overwrite? Let's prefer the one with default.
    const existing = tagsMap.get(name);
    if (!existing || (defaultValue && !existing.default)) {
      tagsMap.set(name, { name, default: defaultValue });
    }
  }

  return Array.from(tagsMap.values());
}

/**
 * Renders the docx with provided data.
 * @param buffer - The docx file buffer.
 * @param data - The data to fill.
 * @returns The filled docx buffer.
 */
export function render(buffer: Buffer, data: Record<string, any>): Buffer {
  const zip = new PizZip(buffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{", end: "}" },
    parser: function (tag: string) {
      // tag is "VAR" or "VAR|default"
      const parts = tag.split("|");
      const key = parts[0].trim();
      const defaultValue =
        parts.length > 1 ? parts.slice(1).join("|").trim() : "";

      return {
        get: function (scope: any, context: any) {
          const val = scope[key];
          // If value is present (even empty string), use it.
          // If value is undefined or null, use default.
          if (val !== undefined && val !== null) {
            return val;
          }
          return defaultValue;
        },
      };
    },
  });

  doc.render(data);

  return doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
}
