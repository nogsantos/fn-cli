const expect = require('chai').expect;
const fileSystem = require('../src/resources/file-system');

describe('File System', function () {

    const dirToTest = `${__dirname}/testing`;

    before(function () {
        fileSystem.removeDir(dirToTest);
    });

    it('should get the current dir', function () {
        expect(fileSystem.exists(__dirname)).to.be.not.null;
    });

    it('should create a dir', function () {
        return fileSystem.mkdir(dirToTest).then(function (data) {
            expect(data).to.be.an('undefined');
        });
    });

    it('should read a dir', function () {
        return fileSystem.readdir(dirToTest).then(function (data) {
            expect(data).to.be.an('array').that.is.empty;
        });
    });

    it('should write a file inside created dir', function () {
        return fileSystem.writeFile(`${dirToTest}/TEST`, 'test').then(function (data) {
            expect(data).to.be.an('undefined');
        });
    });

    it('should read a file inside created dir', function () {
        return fileSystem.readFile(`${dirToTest}/TEST`).then(function (data) {
            expect(data).to.have.string('test');
        });
    });

    after(function() {
        fileSystem.removeDir(dirToTest);
    });

});
