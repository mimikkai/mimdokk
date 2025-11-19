# Spec: Native TypeScript Support

## ADDED Requirements

### Requirement: Execute TypeScript natively
The application MUST execute `.ts` files using the Node.js binary without external loaders.

#### Scenario: Running the CLI
Given the project is installed
When I run `npm start`
Then the application should execute `bin/mimdokk.ts` using `node`
And it should not use `tsx`

## REMOVED Requirements

### Requirement: TypeScript Configuration
The project MUST NOT require a `tsconfig.json` file for runtime execution.

#### Scenario: File existence
Given the project root
When I list files
Then `tsconfig.json` should not exist
