# Design: Publish to GitHub Packages

## Package Configuration

### Scoped Package Name
GitHub Packages requires the package name to be scoped to the owner of the repository.
-   **Current**: `mimdokk`
-   **New**: `@mimikkai/mimdokk`

### Publish Configuration
We need to explicitly tell npm to use the GitHub registry for publishing.
In `package.json`:
```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

### Repository Field
Ensure the `repository` field is correctly set in `package.json` to link the package to the GitHub repo.

## CI/CD Workflow

### Trigger
The workflow will trigger on:
-   `release`: types `[created]`
-   (Optional) `push`: tags `v*`

### Steps
1.  **Checkout**: Checkout the code.
2.  **Setup Node**: Use `actions/setup-node` with `registry-url: 'https://npm.pkg.github.com'`.
3.  **Install**: `npm ci` or `npm install`.
4.  **Build**: Run build script (if applicable, currently `tsc` is in devDependencies but no build script in `package.json`, we might need to add one or just run `tsc`). *Note: The current project has a `bin/mimdokk.ts` and uses `ts-node` (implied by `bin` pointing to `.ts` file? No, `bin` points to `.ts` but `package.json` has `main: lib/docx.ts`. Wait, `bin` pointing to `.ts` usually requires a loader or pre-compilation. The `package.json` shows `bin/mimdokk.ts`. If we publish to npm, we usually publish JS files. I should check if a build step is needed. The `package.json` has `typescript` but no `build` script. I will assume for this proposal we need to ensure it's publishable, likely by adding a build step or ensuring `ts-node` is used by consumers, but standard practice is to publish JS. For now, I will focus on the *publishing mechanism*, but I'll add a task to verify the build artifact.*
5.  **Publish**: `npm publish`. The `NODE_AUTH_TOKEN` will be set to `${{ secrets.GITHUB_TOKEN }}`.

## Consumption
Users will need to add a `.npmrc` file to install the package:
```
@mimikkai:registry=https://npm.pkg.github.com
```
This should be documented in the README.
