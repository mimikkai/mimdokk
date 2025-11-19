# Spec: TypeScript Migration

## MODIFIED Requirements

### Requirement: Codebase Language
The codebase MUST be written in TypeScript.

#### Scenario: File extensions
Given the project structure
When I list the files in `lib` and `bin`
Then they should have `.ts` extensions

#### Scenario: Type safety
Given the source code
When I run `tsc --noEmit`
Then it should complete without errors

### Requirement: Execution
The tool MUST be executable directly using `tsx` or modern Node.js capabilities.

#### Scenario: Run CLI
Given the migrated codebase
When I run `npx tsx bin/mimdokk.ts --help`
Then it should display the help message

#### Scenario: Package binary
Given the `package.json`
When I check the `bin` entry
Then it should point to a file executable by Node.js (via `tsx` shebang or wrapper)
