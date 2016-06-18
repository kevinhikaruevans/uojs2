import { Packet } from '../../src/network/packet';

describe('Packet', () => {
    const p = new Packet(3);
    p.append(0x22, 0x00, 0x00);

    describe('0x22 test packet', () => {
        it('should be 3 bytes long', () => expect(p.size()).to.be.equal(3));
        it('should have an id of 0x22', () => expect(p.getId()).to.be.equal(0x22));
    });
});
