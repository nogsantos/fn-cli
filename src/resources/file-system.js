const fs = require('fs');
/**
 *
 * @param {*} path
 */
exports.exists = path => {
    return new Promise(
        (resolve, reject) => fs.exists(path, resolve)
    );
};
/**
 *
 * @param {*} path
 */
exports.existsSync = fs.existsSync;
exports.writeFileSync = fs.writeFileSync;
exports.mkdirSync = fs.mkdirSync;
exports.mkdir = path => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};
/**
 *
 * @param {*} path
 */
exports.readdir = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (error, files) => {
            resolve(error || files);
        });
    });
}
/**
 *
 * @param {*} path
 * @param {*} encoding
 */
exports.readFile = (path, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encoding || 'utf8', (error, data) => {
            resolve(error || data);
        });
    });
};

/**
 *
 * @param {*} path
 * @param {*} encoding
 */
exports.readFileSync = fs.readFileSync;
exports.readFileSync = (path, encoding) => {
    return fs.readFileSync(path, encoding || 'utf8');
};
/**
 *
 * @param {*} path
 * @param {*} content
 * @param {*} encoding
 */
exports.writeFile = (path, content, encoding) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, encoding || 'utf8', error => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};
/**
 * Remove a dir
 *
 * @param {*} path
 */
exports.removeDir = path => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                this.removeDir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
