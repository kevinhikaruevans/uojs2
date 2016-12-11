const config = {
      development : './src/client',
      production  : {
          main    : './src/client',
          vendors : [
              'react',
              'react-dom'/*,
              'react-router',
              'react-router-scroll',
              'react-router-fetcher',
              'react-redux',
              'redux',
              'redux-thunk',
              'moment',
              'socket.io-client'*/
          ]
      }
};

module.exports = config[global.webpack.env];
