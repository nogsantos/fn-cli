const colors = require('colors/safe');
/**
 * Sytem style logs.
 */
class Log {
    i(msg, titulo) {
        this.showLog(`${colors.bold.blue(`(i) ${titulo || "Informação"}`)}:`, `\n\t${msg}`);
    }
    e(msg, titulo) {
        this.showLog(`${colors.bold.red(`(x) ${titulo || "Erro"}`)}`, `\n\t${msg}`);
    }
    a(msg, titulo) {
        this.showLog(`${colors.bold.yellow(`(!) ${titulo || "Atenção"}`)}:`, `\n\t${msg}`);
    }
    s(msg, titulo) {
        this.showLog(`${colors.bold.green(`(v) ${titulo || "Sucesso"}`)}:`, `\n\t${msg}`);
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
}

module.exports = Log;
