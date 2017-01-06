const env = process.env.NODE_ENV || 'development';
let config = {};

if(env) {
    try {
        config = require(`./local_${env}.js`);
    } catch(error) {
        try {
            config = require(`./${env}.js`);
        } catch(error) {
            throw `Do you have ${env} config?`;
        }
    }
}

module.exports = config;
