# Publish to GitHub Packages

## Summary
Configure the project to publish the npm package to the GitHub Package Registry instead of the public npm registry. This involves renaming the package to a scoped name, updating configuration, and adding a CI/CD workflow.

## Problem
The project currently lacks an automated publishing pipeline. The user specifically requested publishing to the GitHub Package Registry, which requires specific configuration and authentication handling that is not currently present.

## Solution
1.  Rename the package to `@mimikkai/mimdokk` to match the GitHub repository owner (required for GitHub Packages).
2.  Configure `package.json` with `publishConfig` pointing to `npm.pkg.github.com`.
3.  Create a GitHub Action workflow that triggers on release/tag and publishes the package using `GITHUB_TOKEN`.

## Impact
-   **Breaking Change**: The package name will change from `mimdokk` to `@mimikkai/mimdokk`.
-   **Distribution**: The package will be hosted on GitHub Packages, requiring users to configure their `.npmrc` to install it.
