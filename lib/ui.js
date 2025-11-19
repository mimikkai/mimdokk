const prompts = require('prompts');
const chalk = require('chalk');

/**
 * Prompts the user for values for each tag.
 * @param {string[]} tags - Array of tag names.
 * @returns {Promise<Object>} - Object with tag names as keys and user input as values.
 */
async function promptForTags(tags) {
    if (tags.length === 0) {
        console.log(chalk.yellow('⚠️ No tags found in document.'));
        return {};
    }

    console.log(chalk.blue(`Found ${tags.length} unique tags. Please provide values:`));

    const questions = tags.map(tag => ({
        type: 'text',
        name: tag,
        message: `Enter value for ${chalk.green(tag)}:`
    }));

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
