'use strict';
require('dotenv').load();

const Hapi = require('hapi');
const Webpack = require('webpack');
const WebpackPlugin = require('hapi-webpack-plugin');
const server = new Hapi.Server();

server.connection({port: process.env.PORT || 3000});
server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    helpersPath: './views/helpers'
});
server.route({
  path: '/',
  method: 'GET',
  handler: function(req, res) {
    res('Hello World');
  }
});

const compiler = new Webpack({
  entry: './app.js',
  output: {
    path: __dirname + '/',
    publicPath: './build/assets/',
    filename: 'bundle.js'
  }
});

const assets = {

};

const hot = {
};

server.register({
  register: WebpackPlugin,
  options: {compiler, assets, hot}
},
error => {
  if (error) {
    return console.error(error);
  }
  server.start(() => console.log('Server running at:', server.info.uri));
});
