# Design: Native TypeScript Support

## Context
Node.js 25.2.0 introduced stable support for Type Stripping, allowing `.ts` files to be executed directly by the Node.js binary without requiring a loader like `ts-node` or `tsx`.

## Architecture Changes
-   **Runtime:** Switch from `tsx` loader to native Node.js execution.
-   **Configuration:** Eliminate `tsconfig.json` as it is not used by Node.js for type stripping (Node.js ignores it and simply strips type annotations).

## Trade-offs
| Trade-off | Decision | Reasoning |
| :--- | :--- | :--- |
| **Type Checking** | Rely on IDE/CI | Node.js type stripping does not check types, it only removes them. This is acceptable as type checking should happen during development (IDE) or CI, not runtime. |
| **TS Features** | Limit to supported syntax | Native type stripping does not support features that require code transformation (e.g., `enum`, `namespaces`, parameter properties). We verified the codebase does not use `enum`. |

## Risks
-   **Compatibility:** Users must have Node.js >= 25.2.0. This is enforced via `mise.toml`.
-   **Future TS Features:** If we use complex TS features later, we might need a build step again, but for now, standard ES syntax + types is sufficient.
