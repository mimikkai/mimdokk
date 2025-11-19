# Design: CLI Architecture

## Architecture
The application will be structured as a standard Node.js CLI tool.

### Components
1.  **CLI Entry Point (`bin/mimdokk.js`)**: Handles argument parsing using `commander`.
2.  **Docx Processor (`lib/docx.js`)**:
    *   Wraps `pizzip` and `docxtemplater`.
    *   `extractTags(buffer)`: Returns unique tags.
    *   `render(buffer, data)`: Returns filled buffer.
3.  **Interactivity (`lib/ui.js`)**:
    *   Uses `prompts` to query user for each tag.
4.  **File System (`lib/fs.js`)**:
    *   Handles reading/writing files safely.

## Data Flow
1.  User runs `mimdokk template.docx`.
2.  CLI reads `template.docx`.
3.  `Docx Processor` extracts tags (e.g., `['NAME', 'DATE']`).
4.  `Interactivity` module loops through tags and asks user.
5.  User inputs data.
6.  `Docx Processor` renders template with data.
7.  CLI writes `template-filled.docx`.

## Dependencies
- `commander`: CLI framework.
- `prompts`: Interactive input.
- `chalk`: Terminal styling.
- `docxtemplater` & `pizzip`: Docx manipulation (existing).
