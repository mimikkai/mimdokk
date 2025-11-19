#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { extractTags, render } = require('../lib/docx');
const { promptForTags } = require('../lib/ui');
const packageJson = require('../package.json');

const program = new Command();

program
    .name('mimdokk')
    .description('CLI utility to fill .docx templates')
    .version(packageJson.version);

program
    .command('fill', { isDefault: true })
    .description('Fill a docx template')
    .argument('<file>', 'path to the .docx file')
    .option('-o, --output <output>', 'output file path')
    .action(async (file, options) => {
        const filePath = path.resolve(process.cwd(), file);

        if (!fs.existsSync(filePath)) {
            console.error(chalk.red(`❌ File not found: ${file}`));
            process.exit(1);
        }

        if (path.extname(filePath) !== '.docx') {
            console.error(chalk.red('❌ Not a valid DOCX file'));
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

        } catch (error) {
            console.error(chalk.red('❌ Error processing file:'), error.message);
            process.exit(1);
        }
    });

program
    .command('inspect')
    .description('Inspect tags in a docx file')
    .argument('<file>', 'path to the .docx file')
    .action((file) => {
        const filePath = path.resolve(process.cwd(), file);

        if (!fs.existsSync(filePath)) {
            console.error(chalk.red(`❌ File not found: ${file}`));
            process.exit(1);
        }

        try {
            const buffer = fs.readFileSync(filePath);
            const tags = extractTags(buffer);

            if (tags.length === 0) {
                console.log(chalk.yellow('⚠️ No tags found in document.'));
            } else {
                console.log(chalk.blue(`Found ${tags.length} unique tags:`));
                tags.forEach(tag => console.log(`- ${tag}`));
            }

        } catch (error) {
            console.error(chalk.red('❌ Error processing file:'), error.message);
            process.exit(1);
        }
    });

program.parse();
