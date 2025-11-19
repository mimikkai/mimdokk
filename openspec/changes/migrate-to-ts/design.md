# Design: TypeScript Migration

## Architecture
The architecture remains the same, but the implementation language changes to TypeScript.

### Execution Strategy
To satisfy the "out of the box" requirement with modern Node.js:
- We will use `tsx` (TypeScript Execute) as a dev dependency and runtime runner.
- This allows running `npx mimdokk` or `node bin/mimdokk.ts` (via a wrapper or loader) without a separate build step during development.
- For production/distribution, we can keep using `tsx` or compile to JS. Given the "minimalist" nature, running via `tsx` is acceptable for now, or we can rely on Node.js 22+ experimental strip-types if we avoid specific TS features (enums, etc.).
- **Decision:** Use `tsx` for robustness. It works on older Node versions too and handles ESM/CJS interop well.

### File Structure Changes
- `bin/mimdokk.js` -> `bin/mimdokk.ts`
- `lib/docx.js` -> `lib/docx.ts`
- `lib/ui.js` -> `lib/ui.ts`
- `process-docx.js` -> (Delete or rename to `process-docx.ts` if still needed, but it's largely superseded by CLI).

### Configuration
- `tsconfig.json`:
    - `target`: `ESNext` (or `ES2022`)
    - `module`: `NodeNext` (for modern module resolution)
    - `strict`: `true`
    - `esModuleInterop`: `true`

## Dependencies
- `typescript`
- `tsx`
- `@types/node`
- `@types/commander`
- `@types/prompts`
- `@types/docxtemplater` (if available, or declare module)
- `@types/pizzip` (if available)
