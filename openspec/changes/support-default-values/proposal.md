# Proposal: Support Default Values in Tags

## Summary
Update the template syntax to use single braces `{VAR}` and support default values `{VAR|default}`.

## Motivation
Users want to define default values directly in the document template. This allows for "Drop & Fill" scenarios where some fields can be skipped or have sensible defaults (e.g., City, Position). The syntax `{VAR|default}` is intuitive and compact.

## Proposed Changes
- Change `docxtemplater` delimiters from `{{` `}}` to `{` `}`.
- Update tag extraction logic to parse `VAR|default` syntax.
- Update the rendering logic to handle default values when data is missing.
- Update the CLI prompts to show and use these default values.
