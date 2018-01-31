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

const list = [{
    type: 'list',
    name: 'skeleton',
    message: 'What skeleton do you want to get?',
    choices: [
        'Angular App',
        'Angular AMD module',
        'Javascript AMD module',
        'Aurelia',
        'React'
    ]
}];
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
            return 'uninformed';
        }
    },
    {
        type: 'input',
        name: 'name',
        message: 'What\'s your name',
        default: function () {
            return 'uninformed';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What\'s your e-mail address',
        validate: function (value) {
            if (value === 'uninformed@mail') {
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
            return 'uninformed@mail';
        }
    },
    {
        type: 'input',
        name: 'url',
        message: 'What\'s your website address',
        validate: function (value) {
            if (value === 'http://notknow.com') {
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
            return 'http://notknow.com';
        }
    }
];
/**
 * Gerador Angular para desenvolvimento de módulos
 *
 */
module.exports = class GenerateCommand extends Command {
    /**
     * Construtor.
     */
    constructor() {
        super('g');
    }
    /**
     * Ajuda para utilizar o comando.
     */
    help() {
        return {
            description: 'To get skeleton of one project um must run: fn-cli g',
            args: ['generator']
        };
    }
    /**
     * Execução do comando
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
                    // console.log(JSON.stringify(answers, null, '  '));
                    this.end();
                });
            } catch (error) {
                log.e("Erro ao executar o comando. Consulte o manual para maiores informações: fn-cli help");
                log.a(error, "Log do erro");
                log.bgm("\n(!) Erro! Dê uma olhada na linha acima, no Log do erro\n");
            }
        });
    }
    /**
     * Método para criação dos diretórios, caso não existam.
     */
    createDir(cd, modulePath) {
        for (let i = 0; i < modulePath.length; i++) {
            cd += '/' + modulePath[i];
            if (!fs.existsSync(cd)) {
                try {
                    fs.mkdirSync(cd);
                    log.s(`/${modulePath[i]}`, 'Diretório criado');
                } catch (error) {
                    log.e(`/${modulePath[i]}`, 'Falha na criação do diretório');
                }
            }
        }
    }
    /**
     *
     */
    init() {
        log.bgi("******************** The great Houdine will work now ********************");
    }
    /**
     *
     */
    end() {
        log.bgg("******************** The end! ********************");
    }
};
