const fs = require('fs');
/**
 *
 * @param {*} path
 */
exports.exists = (path) => {
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
exports.mkdir = function (path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};
/**
 *
 * @param {*} path
 */
exports.readdir = function (path) {
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
exports.readFile = function (path, encoding) {
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
exports.readFileSync = function (path, encoding) {
    return fs.readFileSync(path, encoding || 'utf8');
};
/**
 *
 * @param {*} path
 * @param {*} content
 * @param {*} encoding
 */
exports.writeFile = function (path, content, encoding) {
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
