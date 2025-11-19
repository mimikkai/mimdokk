# Proposal: Migrate to TypeScript

## Summary
Convert the entire codebase from JavaScript (CommonJS) to TypeScript to improve type safety and developer experience. The project will be configured to run "out of the box" using modern Node.js tooling (via `tsx`).

## Motivation
- **Type Safety:** Catch errors at compile time rather than runtime.
- **Developer Experience:** Better autocompletion and documentation.
- **Modernization:** Align with modern Node.js development practices.
- **User Request:** "TS should work out of the box from modern node.js".

## Proposed Changes
- Install TypeScript and necessary `@types/*` packages.
- Install `tsx` for executing TypeScript files directly.
- Create `tsconfig.json` with strict mode enabled.
- Rename `.js` files to `.ts` and add type annotations.
- Update `package.json` scripts to use `tsx`.
- Update `Razdfile.yml` to use `tsx`.
