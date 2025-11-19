const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');

/**
 * Extracts unique tags from a docx buffer.
 * @param {Buffer} buffer - The docx file buffer.
 * @returns {Array<{name: string, default: string|null}>} - Array of unique tag objects.
 */
function extractTags(buffer) {
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: '{', end: '}' }
    });

    const text = doc.getFullText();
    // Match {VAR} or {VAR|default}
    // Captures: 1=VAR, 2=default (optional)
    const regex = /{\s*([^}|]+?)\s*(?:\|\s*([^}]+?)\s*)?}/g;
    const tagsMap = new Map();
    let match;

    while ((match = regex.exec(text)) !== null) {
        const name = match[1];
        const defaultValue = match[2] || null;

        // If tag already exists, keep the one with default value if current doesn't have one
        // Or just overwrite? Let's prefer the one with default.
        if (!tagsMap.has(name) || (defaultValue && !tagsMap.get(name).default)) {
            tagsMap.set(name, { name, default: defaultValue });
        }
    }

    return Array.from(tagsMap.values());
}

/**
 * Renders the docx with provided data.
 * @param {Buffer} buffer - The docx file buffer.
 * @param {Object} data - The data to fill.
 * @returns {Buffer} - The filled docx buffer.
 */
function render(buffer, data) {
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: '{', end: '}' },
        parser: function (tag) {
            // tag is "VAR" or "VAR|default"
            const parts = tag.split('|');
            const key = parts[0].trim();
            const defaultValue = parts.length > 1 ? parts.slice(1).join('|').trim() : '';

            return {
                get: function (scope, context) {
                    const val = scope[key];
                    // If value is present (even empty string), use it.
                    // If value is undefined or null, use default.
                    if (val !== undefined && val !== null) {
                        return val;
                    }
                    return defaultValue;
                }
            };
        }
    });

    doc.render(data);

    return doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE'
    });
}

module.exports = {
    extractTags,
    render
};
