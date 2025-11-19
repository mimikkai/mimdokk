import prompts, { PromptObject } from "prompts";
import chalk from "chalk";
import { Tag } from "./docx.ts"; // Use .js extension for NodeNext module resolution or just ./docx if bundler handles it. With NodeNext, .js is often required in imports even for .ts files. But let's try without first or check tsconfig.
// With "module": "NodeNext", we should use .js extension in imports for local files if we are compiling to ESM.
// But we are using tsx. tsx handles it.
// Let's use .js extension to be safe and standard compliant for NodeNext.

/**
 * Prompts the user for values for each tag.
 * @param tags - Array of tag objects.
 * @returns Object with tag names as keys and user input as values.
 */
export async function promptForTags(tags: Tag[]): Promise<Record<string, any>> {
  if (tags.length === 0) {
    console.log(chalk.yellow("⚠️ No tags found in document."));
    return {};
  }

  console.log(
    chalk.blue(`Found ${tags.length} unique tags. Please provide values:`)
  );

  const questions: PromptObject[] = tags.map((tag) => {
    const message = tag.default
      ? `Enter value for ${chalk.green(tag.name)} (default: ${chalk.dim(
          tag.default
        )}):`
      : `Enter value for ${chalk.green(tag.name)}:`;

    return {
      type: "text",
      name: tag.name,
      message: message,
      initial: tag.default || "",
    };
  });

  const response = await prompts(questions, {
    onCancel: () => {
      console.log(chalk.red("🚫 Cancelled"));
      process.exit(1);
    },
  });

  return response;
}
