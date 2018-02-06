const exec = require("exec-sh");
const replace = require('replace');
const fs = require('fs');
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
        exec(commands, null, err => {
            if (err) {
                console.log("Exit code: ", err.code);
                return;
            }
            let replaceFiles = [...this.filesToReplace()];
            replace({
                regex: '--pkg-name',
                replacement: this.package_name,
                paths: replaceFiles,
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--username',
                replacement: this.username,
                paths: replaceFiles,
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-name',
                replacement: this.name,
                paths: replaceFiles,
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-email',
                replacement: this.email,
                paths: replaceFiles,
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-url',
                replacement: this.url,
                paths: replaceFiles,
                recursive: true,
                silent: true,
            });
        });
    }
    /**
     * Get files to replace values
     *
     * @returns Array
     * @memberof Skeleton
     */
    filesToReplace() {
        let files = [];
        [
            `${this.package_name}/package.json`,
            `${this.package_name}/webpack.config.babel.js`,
            `${this.package_name}/README.md`,
            `${this.package_name}/setup.sh`,
            `${this.package_name}/docker-compose.yml`,
        ].forEach(filename => {
            if (fs.existsSync(filename)) {
                files.push(filename);
            }
        });
        return files;
    }
}

module.exports = Skeleton;
