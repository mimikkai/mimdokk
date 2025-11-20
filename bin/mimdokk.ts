#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { extractTags, render } from "../lib/docx";
import { promptForTags } from "../lib/ui";

let packageJson: { version: string };
try {
  // For development (ts-node)
  packageJson = require("../package.json");
} catch {
  try {
    // For production (dist/bin/mimdokk.js)
    packageJson = require("../../package.json");
  } catch {
    packageJson = { version: "unknown" };
  }
}

const program = new Command();

program
  .name("mimdokk")
  .description("CLI utility to fill .docx templates")
  .version(packageJson.version);

program
  .command("fill", { isDefault: true })
  .description("Fill a docx template")
  .argument("<file>", "path to the .docx file")
  .option("-o, --output <output>", "output file path")
  .action(async (file: string, options: { output?: string }) => {
    const filePath = path.resolve(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`❌ File not found: ${file}`));
      process.exit(1);
    }

    if (path.extname(filePath) !== ".docx") {
      console.error(chalk.red("❌ Not a valid DOCX file"));
      process.exit(1);
    }

    try {
      const buffer = fs.readFileSync(filePath);
      const tags = extractTags(buffer);

      const data = await promptForTags(tags);
      const filledBuffer = render(buffer, data);

      let outputPath = options.output;
      if (!outputPath) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        outputPath = `${name}-filled${ext}`;
      }

      fs.writeFileSync(outputPath, filledBuffer);
      console.log(chalk.green(`✅ File successfully saved to: ${outputPath}`));
    } catch (error: any) {
      console.error(chalk.red("❌ Error processing file:"), error.message);
      process.exit(1);
    }
  });

program
  .command("inspect")
  .description("Inspect tags in a docx file")
  .argument("<file>", "path to the .docx file")
  .action((file: string) => {
    const filePath = path.resolve(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`❌ File not found: ${file}`));
      process.exit(1);
    }

    try {
      const buffer = fs.readFileSync(filePath);
      const tags = extractTags(buffer);

      if (tags.length === 0) {
        console.log(chalk.yellow("⚠️ No tags found in document."));
      } else {
        console.log(chalk.blue(`Found ${tags.length} unique tags:`));
        tags.forEach((tag) => {
          const defaultText = tag.default
            ? chalk.dim(` (default: ${tag.default})`)
            : "";
          console.log(`- ${tag.name}${defaultText}`);
        });
      }
    } catch (error: any) {
      console.error(chalk.red("❌ Error processing file:"), error.message);
      process.exit(1);
    }
  });

program.parse();
