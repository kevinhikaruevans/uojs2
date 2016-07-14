import { StringUtils } from '../../src/utils';

describe('StringUtils', () => {
    describe('padRight', () => {
        const str = StringUtils.padRight('hello', 10);
        it('should pad a string', () => expect(str).to.be.equal('hello\0\0\0\0\0'));
    });

    describe('trim', () => {
        it('should trim strings', () => expect(StringUtils.trim('  hello test ')).to.be.equal('hello test'));
    });
});
