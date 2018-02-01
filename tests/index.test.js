const chai = require('chai');
const Cli = require('../src/index');
const CommandLineInterface = require('cmnd').CommandLineInterface;
const expect = chai.expect;

describe('Index', function () {

    before(function () {
        this.index = Cli.prototype;
    });

    it('should be an instace of index', function () {
        expect(this.index).to.be.an.instanceof(CommandLineInterface);
    });
});
