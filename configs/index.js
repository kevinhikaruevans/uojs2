const env = process.env.NODE_ENV || 'development';
let config = {};

if(env) {
    try {
        config = require(`./${env}.json`);
    } catch(error) {
        console.error(`Do you have ${env} config?`, error);
    }
}

module.exports = config;
