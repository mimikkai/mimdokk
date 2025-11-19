const prompts = require('prompts');
const chalk = require('chalk');

/**
 * Prompts the user for values for each tag.
 * @param {Array<{name: string, default: string|null}>} tags - Array of tag objects.
 * @returns {Promise<Object>} - Object with tag names as keys and user input as values.
 */
async function promptForTags(tags) {
    if (tags.length === 0) {
        console.log(chalk.yellow('⚠️ No tags found in document.'));
        return {};
    }

    console.log(chalk.blue(`Found ${tags.length} unique tags. Please provide values:`));

    const questions = tags.map(tag => {
        const message = tag.default
            ? `Enter value for ${chalk.green(tag.name)} (default: ${chalk.dim(tag.default)}):`
            : `Enter value for ${chalk.green(tag.name)}:`;

        return {
            type: 'text',
            name: tag.name,
            message: message,
            initial: tag.default || ''
        };
    });

    const response = await prompts(questions, {
        onCancel: () => {
            console.log(chalk.red('🚫 Cancelled'));
            process.exit(1);
        }
    });

    return response;
}

module.exports = {
    promptForTags
};
