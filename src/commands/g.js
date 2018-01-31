const path = require('path');
const _cliPath = path.join(__dirname, '..');
const _appPath = path.join(process.cwd(), '..');

const Command = require('cmnd').Command;
const fs = require('fs');
const inflect = require('i')(true);
const inquirer = require('inquirer');

let srcDir = `${_appPath}/src`;
const log = require(`${_cliPath}/resources/log.js`);

// const Skeleton = require(`${_cliPath}/resources/skeleton.js`);
const AngularModule = require(`${_cliPath}/resources/angular-module.js`);
/**
 * List skeletons
 */
const list = [{
    type: 'list',
    name: 'skeleton',
    message: 'What skeleton do you want to get?',
    choices: [
        'Angular AMD module',
        // 'Javascript AMD module',
        // 'Angular App',
        // 'Aurelia App',
        // 'React App'
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
module.exports = class GenerateCommand extends Command {
    /**
     * Creates an instance of GenerateCommand.
     */
    constructor() {
        super('g');
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
                log.i(`Chosen: ${result.skeleton} `, 'Info');
                inquirer.prompt(questions).then(answers => {
                    this.init();
                    let skeleton = new AngularModule(answers.package_name, answers.username, answers.name, answers.email, answers.url);
                    skeleton.generate();
                });
            } catch (error) {
                log.e("Erro ao executar o comando. Consulte o manual para maiores informações: fn-cli help");
                log.a(error, "Log do erro");
                log.bgm("\n(!) Erro! Dê uma olhada na linha acima, no Log do erro\n");
            }
        });
    }
    /**
     * Add a title to console
     */
    init() {
        log.bgi("******************** The great Houdine will work now ********************");
    }
    /**
     * Add footer to console
     */
    end() {
        log.bgg("******************** The end! ********************");
    }
};
