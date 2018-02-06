const Command = require('cmnd').Command;
const inquirer = require('inquirer');
const Log = require(`../resources/log.js`);
const Skeleton = require(`../resources/skeleton.js`);
const colors = require('colors/safe');
/**
 * List skeletons
 */
const list = [{
    type: 'list',
    name: 'skeleton',
    message: 'What skeleton do you want to get?',
    choices: [{
            name: 'Angular AMD module',
            value: 'https://github.com/nogsantos/skeleton-npm-angular-pkg.git'
        },
        {
            name: 'Javascript UMD NPM',
            value: 'https://github.com/nogsantos/skeleton-npm-javascript-pkg.git'
        },
        {
            name: 'Java for RestFull API',
            value: 'https://github.com/nogsantos/skeleton-java-api.git'
        }
    ]
}];
/**
 * Questions to generating the package
 */
const questions = [{
        type: 'input',
        name: 'package_name',
        message: 'Package name',
        validate: function (value) {
            if (value) {
                return true;
            }
            return 'Package name is required';
        }
    },
    {
        type: 'input',
        name: 'username',
        message: 'Github username',
        default: function () {
            return 'nogsantos';
        }
    },
    {
        type: 'input',
        name: 'name',
        message: 'What\'s your name',
        default: function () {
            return 'Fabricio Nogueira';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What\'s your e-mail address',
        validate: function (value) {
            if (value === 'nogsantos@gmail.com') {
                return true;
            }
            var pass = value.match(
                /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid e-mail address';
        },
        default: function () {
            return 'nogsantos@gmail.com';
        }
    },
    {
        type: 'input',
        name: 'url',
        message: 'What\'s your website address',
        validate: function (value) {
            if (value === 'http://fabricionogueira.me') {
                return true;
            }
            var pass = value.match(
                /http(s)?(:\/\/)?(www\.)?/
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid url address';
        },
        default: function () {
            return 'http://fabricionogueira.me';
        }
    }
];
/**
 * Generate
 */
class GenerateCommand extends Command {
    /**
     * Creates an instance of GenerateCommand.
     */
    constructor() {
        super('g');
        this.log = new Log();
    }
    /**
     * Command Help
     *
     * @returns
     */
    help() {
        return {
            description: 'To get skeleton of one project um must run: fn-cli g',
            args: ['generator']
        };
    }
    /**
     * Run
     *
     * @param {any} args
     * @param {any} flags
     * @param {any} vflags
     * @param {any} callback
     */
    run(args, flags, vflags, callback) {
        const prompt = inquirer.createPromptModule();
        prompt(list).then(result => {
            try {
                this.log.i(`Resource: ${colors.green.bold(result.skeleton)} `, 'Info');
                inquirer.prompt(questions).then(answers => {
                    this.init();
                    let skeleton = new Skeleton(
                        answers.package_name,
                        answers.username,
                        answers.name,
                        answers.email,
                        answers.url,
                        result.skeleton
                    );
                    skeleton.generate();
                });
            } catch (error) {
                this.log.e("Fail to run the command. See the help for more informations: fn-cli help");
                this.log.a(error, "Error log");
                this.log.bgm("(!) Error! See the line above\n");
            }
        });
    }
    /**
     * Add a title to console
     */
    init() {
        this.log.bgi("******************** The great Houdini will work now ********************");
    }
}

module.exports = GenerateCommand;
