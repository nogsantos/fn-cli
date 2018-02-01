const expect = require('chai').expect;
const Function = require('../src/resources/functions');

describe('Function', function () {

    before(function () {
        this.function = new Function();
    });

    it('should be an instace of Function', function () {
        expect(this.function).to.be.an.instanceof(Function);
    });

    it('should get screen width size', function () {
        expect(this.function.getWidth()).to.not.equal(0);
    });

    it('should get scree height size', function () {
        expect(this.function.getHeight()).to.not.equal(0);
    });

    it('should display the logo on console', function () {
        let logo = this.function.displayLogo();
        if (logo) {
            expect(logo).to.be.true;
        } else {
            expect(logo).to.be.false;
        }
    });

    it('should get window size', function () {
        expect(this.function.getWindowSize()).to.have.all.keys('height', 'width');
    });

});
