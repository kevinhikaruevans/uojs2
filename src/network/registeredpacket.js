class RegisteredPacket
    extends Packet
{
    constructor(id, name, callback) {
        this.id = id;
        this.name = name;
        this.callback = callback;
    }
}
