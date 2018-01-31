const resource = require(`./resources/functions.js`);
const CommandLineInterface = require('cmnd').CommandLineInterface;
/**
 * Inicializa o cliente
 */
module.exports = class Cli extends CommandLineInterface {
    /*
     */
    constructor() {
        super();
    }
    /**
     * Rodando...
     */
    cliCommands() {
        process.nextTick(() => {
            resource.displayLogo();
            this.load(__dirname, './commands');
            this.run(process.argv.slice(2));
        });
    }
}
