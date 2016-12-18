const maxSize = 4096;

/**
 * Basic lookup table for a name & expected size.
 * Negative number denotes variable-sized packets (usually strings). When the packets are variable-sized,
 * the next two bytes (usually) represents the ushort of the packet size.
 * @type {Object}
 */
const types = {
    0x0B: ['Damage',                     7],
    0x11: ['Mob Status Compact',        -1],
    0x1A: ['World Item',                -1],
    0x1B: ['Login Confirm',             37],
    0x1C: ['Ascii Message',             -1],
    0x1D: ['Remove Entity',              5],
    0x20: ['Mobile Update',             19],
    0x21: ['Movement Rejection',         8],
    0x22: ['Move Ack',                   3],
    0x23: ['Drag Effect',               26],
    0x24: ['Open Container',             7],
    0x25: ['Container Content Update',  21],
    0x27: ['Lift Rejection',             2],
    0x2C: ['Resurect Menu',              2],
    0x2D: ['Mob Attributes',            17],
    0x2E: ['Worn Item',                 15],
    0x2F: ['Swing',                     10],
    0x3A: ['Skills List',               -1],
    0x3C: ['Container Content',         -1],

    //
    0x3E: ['Versions',                  37],

    0x33: ['Pause client?!?!!!!',        2],
    0x4E: ['Personal Light Level',       6],
    0x4F: ['Overall Light Level',        2],
    0x53: ['Popup Message',              2],
    0x54: ['Play Sound Effect',         12],
    0x55: ['Login Complete',             1],
    0x5B: ['Time',                       4],
    0x65: ['Set Weather',                4],
    0x6C: ['Target Cursor',             19],
    0x6D: ['Play Music',                 3],
    0x6E: ['Character Animation',       14],
    0x70: ['Graphical Effect 1',        28],
    0x72: ['War Mode',                   5],
    0x73: ['Ping',                       2],
    0x74: ['Vendor Buy List',           -1],
    0x76: ['New Subserver',             16],
    0x77: ['Mobile Moving',             17],
    0x78: ['Mobile Incomming',          -1],
    0x7C: ['Display Menu',              -1],
    0x80: ['Login',                     62],
    0x82: ['Login Rejection',            2],
    0x85: ['Del Char Response',          2],
    0x86: ['Char List Update',          -1],
    0x88: ['Open Paperdoll',            66],
    0x89: ['Corpse Clothing',           -1],
    0x8C: ['Server Relay',              11],
    0x97: ['Player Move',                2],
    0x98: ['Request Name Response',     -1],
    0x99: ['Target Cursor Mul Obj',     26],
    0x9E: ['Vendor Sell List',          -1],
    0xA0: ['Server Select',              3], // Client
    0xA1: ['Update Current Health',      9],
    0xA2: ['Update Current Mana',        9],
    0xA3: ['Update Current Stam',        9],
    0xA5: ['Open Browser',              -1],
    0xA6: ['Tip/Notice Window',         -1],
    0xA8: ['Game Server List',          -1],
    0xA9: ['Chars/Start Loc',           -1],
    0xAA: ['Change Combatant',           5],
    0xAE: ['Unicode Message',           -1],
    0xAF: ['Death Animation',           13],
    0xB0: ['Disp. Gump Fast',           -1],
    0xB7: ['Obj Help Response',         -1],
    // this packet is extra confusing.
    // it's a fixed-length packet that is either 3 or 5 bytes depending
    // on the server version :/
    0xB9: ['Supported Features',         5],
    0xBA: ['Quest Arrow',                6],
    0xBC: ['Seasonal Change',            3],
    0xBD: ['Version Request',            3], // server sends 3 bytes?
    0xBF: ['General Information',       -1],
    0xC0: ['Hued Effect',               36],
    0xC1: ['Message Localized',         -1],
    0xC6: ['Invalid Map Enable',         1],
    0xC7: ['Particle Effect',           49],
    0xCB: ['Global Queue Count',         7],
    0xCC: ['Message Local Aff.',        -1],
    0xD3: ['Extended 0x78',             -1],
    0xD6: ['Mega Cliloc',               -1],
    0xD8: ['Send Custom House',         -1],
    0xDC: ['SE Introduced Rev',          9],
    0xDD: ['Compressed Gump',           -1],
    0xC8: ['Change Update Range',        2],
    0xF3: ['Object Information',        24]
};

export default {
    maxSize,
    types
}
