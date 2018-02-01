const tty = require('tty');
const fs = require(`./file-system.js`);
/**
 * Default functions
 *
 */
class Functions {
    /**
     * Display the logo on console
     */
    displayLogo() {
        if (this.getWidth() < 50) {
            log.i('nogsantos' + os.EOL);
            return;
        } else {
            let logoLocation = require.resolve(`./logo.txt`);
            const logo = fs.readFileSync(logoLocation);
            console.log(logo.toString());
        }
    }
    /**
     * Clear the console
     */
    clearScreen() {
        // let lines = process.stdout.getWindowSize()[1];
        // for(let i = 0; i < lines; i++) {
        //     console.log('\x1Bc');
        // }
        return Promise.resolve();
    }
    /**
     * Get screen width
     */
    getWidth() {
        return this.getWindowSize().width;
    }
    /**
     * Get screen height
     */
    getHeight() {
        return this.getWindowSize().height;
    }
    /**
     * Get user window size
     */
    getWindowSize() {
        var width;
        var height;

        if (tty.isatty(1) && tty.isatty(2)) {
            if (process.stdout.getWindowSize) {
                width = process.stdout.getWindowSize(1)[0];
                height = process.stdout.getWindowSize(1)[1];
            } else if (tty.getWindowSize) {
                width = tty.getWindowSize()[1];
                height = tty.getWindowSize()[0];
            } else if (process.stdout.columns && process.stdout.rows) {
                height = process.stdout.rows;
                width = process.stdout.columns;
            }
        } else {
            width = 80;
            height = 100;
        }

        return {
            height: height,
            width: width
        };
    }
}

module.exports = Functions;
