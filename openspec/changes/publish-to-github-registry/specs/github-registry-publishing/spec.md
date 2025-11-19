# GitHub Registry Publishing

## ADDED Requirements

### The package must be published to the GitHub Package Registry
The project must be configured to publish artifacts to `npm.pkg.github.com` instead of the default npm registry.

#### Scenario: Publishing a new release
Given I have created a new GitHub Release
When the CI pipeline runs
Then the package is published to the GitHub Package Registry associated with the repository
And the package is available for installation via `@mimikkai/mimdokk`

### The package name must be scoped
To be compatible with GitHub Packages, the package name must include the owner scope.

#### Scenario: Checking package name
Given I inspect `package.json`
Then the `name` field is `@mimikkai/mimdokk`

### CI/CD must handle authentication automatically
The publishing process should not require manual intervention or local credentials.

#### Scenario: CI Execution
Given the GitHub Action workflow is triggered
Then it authenticates using the `GITHUB_TOKEN`
And successfully runs `npm publish`
