# Modernize Project Structure

## Summary
Migrate the project to use Node.js 25+ native TypeScript support (Type Stripping), removing the need for `tsx` and `tsconfig.json` for runtime execution.

## Problem
The project currently uses `tsx` and maintains a `tsconfig.json` for executing TypeScript files. With Node.js 25.2.0+, TypeScript files can be executed natively using type stripping, making these external tools and configurations redundant for runtime execution.

## Solution
1.  Leverage Node.js 25.2.0+ native type stripping.
2.  Remove `tsconfig.json`.
3.  Remove `tsx` dependency.
4.  Update `package.json` scripts to use `node` directly.

## Impact
-   **Dependencies:** Removes `tsx`.
-   **Configuration:** Removes `tsconfig.json`.
-   **Runtime:** Uses standard Node.js executable.
