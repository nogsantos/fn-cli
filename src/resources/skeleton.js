var exec = require("exec-sh");
var replace = require('replace');
/**
 * Factory of generates
 */
class Skeleton {
    /**
     * Creates an instance of Skeleton.
     * @param {String} package_name The name of the new packge
     * @param {String} username Github username
     * @param {String} name Name
     * @param {String} email Email
     * @param {String} url Url
     * @param {String} resource The resource address
     * @memberof Skeleton
     */
    constructor(package_name, username, name, email, url, resource) {
        this.package_name = package_name;
        this.username = username;
        this.name = name;
        this.email = email;
        this.url = url;
        this.resource = resource;
    }
    /**
     * Generate the skeleton
     */
    generate() {
        const commands = [
            `git clone ${this.resource} ${this.package_name}`,
            `cd ${this.package_name}`,
            `rm -rf .git/`
        ];

        const packagejson = `${this.package_name}/package.json`;
        const webpack = `${this.package_name}/webpack.config.babel.js`;
        const readme = `${this.package_name}/README.md`;

        exec(commands, null, err => {
            if (err) {
                console.log("Exit code: ", err.code);
                return;
            }
            replace({
                regex: '--pkg-name',
                replacement: this.package_name,
                paths: [packagejson, readme, webpack],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--username',
                replacement: this.username,
                paths: [packagejson, readme],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-name',
                replacement: this.name,
                paths: [packagejson, readme],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-email',
                replacement: this.email,
                paths: [packagejson],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-url',
                replacement: this.url,
                paths: [packagejson, readme],
                recursive: true,
                silent: true,
            });
        });
    }
}

module.exports = Skeleton;
