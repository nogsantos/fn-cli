// import Skeleton from './skeleton';
var exec = require("exec-sh");
var replace = require('replace');
/**
 *
 */
module.exports = class AngularModule {
    /**
     * Creates an instance of AngularModule.
     * @param {any} package_name
     * @param {any} username
     * @param {any} name
     * @param {any} email
     * @param {any} url
     */
    constructor(package_name, username, name, email, url) {
        this.package_name = package_name;
        this.username = username;
        this.name = name;
        this.email = email;
        this.url = url;
    }
    /**
     *
     *
     */
    generate() {
        const commands = [
            `git clone https://github.com/nogsantos/skeleton-npm-angular-pkg.git ${this.package_name}`,
            `cd ${this.package_name}`,
            `rm -rf .git/`
        ];

        const path = `${this.package_name}/package.json`;

        exec(commands, null, err => {
            if (err) {
                console.log("Exit code: ", err.code);
                return;
            }
            replace({
                regex: '--pkg-name',
                replacement: this.package_name,
                paths: [path],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--username',
                replacement: this.username,
                paths: [path],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-name',
                replacement: this.name,
                paths: [path],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-email',
                replacement: this.email,
                paths: [path],
                recursive: true,
                silent: true,
            });
            replace({
                regex: '--author-url',
                replacement: this.url,
                paths: [path],
                recursive: true,
                silent: true,
            });
        });
    }
}
