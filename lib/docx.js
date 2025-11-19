const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');

/**
 * Extracts unique tags from a docx buffer.
 * @param {Buffer} buffer - The docx file buffer.
 * @returns {string[]} - Array of unique tag names.
 */
function extractTags(buffer) {
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: '{{', end: '}}' }
    });

    const text = doc.getFullText();
    const regex = /{{\s*([A-Z0-9_]+)\s*}}/g;
    const tags = new Set();
    let match;

    while ((match = regex.exec(text)) !== null) {
        tags.add(match[1]);
    }

    return Array.from(tags);
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
        delimiters: { start: '{{', end: '}}' }
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
