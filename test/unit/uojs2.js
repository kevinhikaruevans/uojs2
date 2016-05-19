import uojs from '../../src/uojs2';

describe('uojs', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(uojs, 'greet');
      uojs.greet();
    });

    it('should have been run once', () => {
      expect(uojs.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(uojs.greet).to.have.always.returned('hello');
    });
  });
});
