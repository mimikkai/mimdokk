# Design: Default Values Syntax

## Syntax
- **Tag:** `{VAR_NAME}` or `{VAR_NAME|Default Value}`
- **Delimiters:** `{` and `}`
- **Separator:** `|`

## Components

### 1. Tag Extraction (`lib/docx.js`)
- **Regex:** Needs to match `{...}` but avoid Word's internal XML if possible (docxtemplater handles XML, but we need to extract text).
- **Logic:**
    - Scan text for `{...}`.
    - Split content by `|`.
    - First part is `key` (trimmed).
    - Second part is `defaultValue` (trimmed).
    - Return structure: `[{ name: 'VAR', default: 'val' }]`.

### 2. Rendering (`lib/docx.js`)
- **Custom Parser:**
    - `docxtemplater` allows a `parser` function.
    - The parser will parse the tag string (e.g., `VAR|default`).
    - It returns a function `get(scope, context)`.
    - `get` implementation:
        - Check if `scope[VAR]` exists and is not empty.
        - If yes, return `scope[VAR]`.
        - If no, return `default`.

### 3. CLI Prompts (`lib/ui.js`)
- **Input:** List of tag objects `{ name, default }`.
- **Display:** `Enter value for VAR (default: val):`
- **Behavior:**
    - Use `initial` property in `prompts` if a default exists.
    - If user clears it, it becomes empty string (unless we enforce default).
    - Actually, if the user inputs nothing, we might want to fallback to default in the *data* object passed to render.
    - **Decision:** The CLI collects data. If the user accepts the default (or types nothing?), we pass that value.
    - However, the `render` logic *also* handles defaults. This is redundant but safe.
    - **Refinement:** The `render` logic is the source of truth for the document generation. The CLI is just a way to populate the `scope`.
    - If the user leaves a field empty in CLI, we pass `""` (empty string).
    - If the template is `{VAR|default}`, and we pass `VAR: ""`, should it show `""` or `default`?
    - **Rule:** If variable is *missing* (undefined), use default. If variable is *empty string*, use empty string?
    - User requirement: "If variable VAR is absent - substitute default... If neither value nor default is set - leave empty".
    - "If variable VAR found in input - substitute it".
    - So if user types empty string, it is "found".
    - But for CLI, usually "Enter" means "skip/default".
    - Let's make the CLI pre-fill the default value. If user deletes it, they get empty string.

## Edge Cases
- **Word Splitting:** Word often splits text runs like `{` `VAR` `}` into separate XML nodes. `docxtemplater` handles this generally, but our regex extraction on `getFullText()` is safe because `getFullText()` returns clean text.
- **Special Characters:** Support Cyrillic, spaces in defaults.
