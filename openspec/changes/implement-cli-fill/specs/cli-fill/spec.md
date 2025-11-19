# Spec: CLI Fill Capability

## ADDED Requirements

### Requirement: CLI Entry Point
The tool MUST be executable via `npx mimdokk` or globally installed `mimdokk`.

#### Scenario: Default command
Given a file `contract.docx`
When I run `mimdokk contract.docx`
Then it should start the fill process for `contract.docx`

#### Scenario: Explicit fill command
Given a file `contract.docx`
When I run `mimdokk fill contract.docx`
Then it should start the fill process for `contract.docx`

#### Scenario: Help command
When I run `mimdokk --help`
Then it should show usage information including `fill` and `inspect` commands

### Requirement: Tag Extraction and Prompting
The tool MUST identify `{{TAG}}` patterns and prompt the user.

#### Scenario: Extract unique tags
Given a docx file with tags `{{NAME}}` and `{{DATE}}` and `{{NAME}}` (duplicate)
When I run the fill command
Then it should prompt me for `NAME` once
And it should prompt me for `DATE` once

#### Scenario: Valid tag characters
The tool should recognize tags containing `A-Z`, `0-9`, and `_`.

### Requirement: Document Generation
The tool MUST generate a valid `.docx` file with replaced values.

#### Scenario: Output file naming
Given input `template.docx`
When I complete the prompts
Then it should save the result to `template-filled.docx` by default

#### Scenario: Custom output path
Given input `template.docx`
When I run `mimdokk template.docx -o result.docx`
Then it should save the result to `result.docx`

### Requirement: Inspect Command
The tool MUST allow inspecting tags without filling.

#### Scenario: Inspect tags
Given a file `template.docx` with tags `{{A}}`, `{{B}}`
When I run `mimdokk inspect template.docx`
Then it should list `A` and `B` in the output
And it should not prompt for input
