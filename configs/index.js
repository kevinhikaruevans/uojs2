const env = process.env.NODE_ENV || 'development';
let config = {};

if(env) {
    try {
        config = require(`./${env}.json`);
    } catch(error) {
        throw `Do you have ${env} config? View sample 'development.json.sample'`;
    }
}

module.exports = config;
