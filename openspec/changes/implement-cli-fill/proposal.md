# Proposal: Implement CLI Fill Command

## Summary
Transform the current script-based `mimdokk` into a full-fledged CLI utility that allows users to interactively fill `.docx` templates via the terminal.

## Motivation
Currently, `mimdokk` is a static script (`process-docx.js`) with hardcoded data. To make it useful for end-users, it needs to be a CLI tool that can accept any `.docx` file, parse it for tags, prompt the user for input, and generate a filled document.

## Proposed Changes
- Create a CLI entry point using `commander`.
- Implement `fill` command as the default action.
- Implement tag extraction logic from `.docx` files.
- Implement interactive prompts using `prompts`.
- Use `docxtemplater` and `pizzip` for rendering.
- Add `inspect` command to list tags without filling.
