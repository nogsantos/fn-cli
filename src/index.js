const resource = require(`./resources/functions.js`);
const CommandLineInterface = require('cmnd').CommandLineInterface;
/**
 * Index of client
 */
module.exports = class Cli extends CommandLineInterface {
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
            resource.displayLogo();
            /**
             * Loading and run
             */
            this.load(__dirname, './commands');
            this.run(process.argv.slice(2));
        });
    }
}
