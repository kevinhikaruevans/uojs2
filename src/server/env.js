const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
    alias : {
        'd' : 'debug'
    }
});

if(argv.debug) {
    process.env.DEBUG = argv.debug
}
