const colors = require('colors/safe');
/**
 * Sytem style logs.
 */
class Log {
    i(msg, titulo) {
        this.showLog(`${colors.bold.blue(`(i) ${titulo || "Info"}`)}:`, `\n\t${msg}`);
    }
    e(msg, titulo) {
        this.showLog(`${colors.bold.red(`(x) ${titulo || "Error"}`)}`, `\n\t${msg}`);
    }
    a(msg, titulo) {
        this.showLog(`${colors.bold.yellow(`(!) ${titulo || "Attention"}`)}:`, `\n\t${msg}`);
    }
    s(msg, titulo) {
        this.showLog(`${colors.bold.green(`(v) ${titulo || "Success"}`)}:`, `\n\t${msg}`);
    }
    g(msg, titulo) {
        this.showLog(`${colors.bold.grey(`[MSG] ${titulo || ""}`)}:`, `\n\t${msg}`);
    }
    d(msg, titulo) {
        this.showLog(`${colors.bold.cyan(`[DEBUG] ${titulo || ""}`)}:`, `${msg}`);
    }
    bgi(msg) {
        this.showLog('', colors.bold.bgBlue(`\n${colors.bold.white(msg)}\n`));
    }
    bgm(msg) {
        this.showLog('', colors.bold.bgMagenta(`\n${colors.bold.white(msg)}\n`));
    }
    bgg(msg) {
        this.showLog('', colors.bold.bgGreen(`\n${colors.bold.white(msg)}\n`));
    }
    showLog(titulo, msg) {
        console.log(titulo, msg);
    }
    ask(question) {
        // console.log(question);
        return new Promise(function (resolve) {
            process.stdin.once('data', function (data) {
                resolve(data.toString().trim());
            });
        });
    }
}

module.exports = Log;
