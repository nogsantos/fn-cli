const chai = require('chai');
const Log = require('../src/resources/log');
const stdin = require('mock-stdin').stdin();
const bddStdin = require('bdd-stdin');
const expect = chai.expect;

describe('Log', function () {

    before(function () {
        this.log = new Log();
    });

    it('should be an instace of Log', function () {
        expect(this.log).to.be.an.instanceof(Log);
    });

    it('should show the log', function () {
        bddStdin('answer');
        return this.log.ask('type "answer"').then(function (response) {
            console.assert(response === 'answer');
        });
    });
});
