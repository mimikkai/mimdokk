# Spec: Default Values Capability

## MODIFIED Requirements

### Requirement: Tag Syntax
The tool MUST support single braces `{` and `}` as delimiters.
The tool MUST support the pipe `|` separator for default values.

#### Scenario: Simple tag
Given a template with `{NAME}`
When I run the tool
Then it should identify `NAME` as a tag

#### Scenario: Tag with default
Given a template with `{CITY|Moscow}`
When I run the tool
Then it should identify `CITY` as a tag
And it should identify `Moscow` as the default value

### Requirement: Rendering Logic
The tool MUST use the default value if the variable is not provided in the data.

#### Scenario: Default used
Given a template `{CITY|Moscow}`
And input data `{}` (empty)
When I render the document
Then the result should contain `Moscow`

#### Scenario: Value overrides default
Given a template `{CITY|Moscow}`
And input data `{CITY: 'London'}`
When I render the document
Then the result should contain `London`

#### Scenario: Empty string overrides default
Given a template `{CITY|Moscow}`
And input data `{CITY: ''}`
When I render the document
Then the result should contain `` (empty string)

### Requirement: CLI Prompts
The CLI MUST display default values in prompts.

#### Scenario: Prompt with default
Given a tag `{CITY|Moscow}`
When the CLI prompts for `CITY`
Then it should show `Moscow` as the initial/default value
