const Functions = require(`./resources/functions.js`);
const CommandLineInterface = require('cmnd').CommandLineInterface;
/**
 * Index of client
 */
class Cli extends CommandLineInterface {
    /**
     * Creates an instance of Cli.
     */
    constructor() {
        super();
    }
    /**
     * Commands
     *
     */
    cliCommands() {
        process.nextTick(() => {
            /**
             * Logo
             */
            const func = new Functions();
            func.displayLogo();
            /**
             * Loading and run
             */
            this.load(__dirname, './commands');
            this.run(process.argv.slice(2));
        });
    }
}

module.exports = Cli;
