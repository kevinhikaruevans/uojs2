# uojs2

A web-based client for the game Ultima Online.

[![Slack Status](http://kevinhikaruevans.com:3000/badge.svg)](http://kevinhikaruevans.com:3000/)
[![Travis build status](http://img.shields.io/travis/kevinhikaruevans/uojs2.svg?style=flat)](https://travis-ci.org/kevinhikaruevans/uojs2)
[![Code Climate](https://codeclimate.com/github/kevinhikaruevans/uojs2/badges/gpa.svg)](https://codeclimate.com/github/kevinhikaruevans/uojs2)
[![Test Coverage](https://codeclimate.com/github/kevinhikaruevans/uojs2/badges/coverage.svg)](https://codeclimate.com/github/kevinhikaruevans/uojs2)
[![Dependency Status](https://david-dm.org/kevinhikaruevans/uojs2.svg)](https://david-dm.org/kevinhikaruevans/uojs2)
[![devDependency Status](https://david-dm.org/kevinhikaruevans/uojs2/dev-status.svg)](https://david-dm.org/kevinhikaruevans/uojs2#info=devDependencies)

## Overview

This project is aiming to emulate the game Ultima Online (ver 7.x.x.x) in a web enviroment. It uses websockets (with websockify) to connect to servers that utilize the Ultima Online protocol. It then uses Redux to manage the global state.

It will be using Canvas2D (and possibly webgl) to render the objects to a canvas element. 

## Current Status

Networking works and it updates the state. Currently I am trying to fully implement the Ultima Online protocol and update the global state object, as it would in the original client. 

I also need to create a script to run the webserver to host (and because it'll be cool to just `npm start` to get it running or something). Right now, it's just using a static file.

There also needs to be an art server and a way to quickly transfer art between the server and client. WebP + http2? maybe? no idea.

## Getting Started

0. Install nodejs, gulp.
1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `gulp build` (or `gulp watch`)
4. Run index.html
5. Eat sandwich

## Contributing

Here are some ways you can contribute to this project!

* Implement more of the packets. Check out the `state` directory.
* Create a UI. I'm thinking if the state has an 'invalidate' flag, so that when set to true, it'll call a redraw in the redux subscribe method, which just rerenders the viewport. Does that make sense? I have no idea.
* If you're a hardcore javascripter (is that a word?), tell me what I'm doing wrong and how I can improve my style
* Write tests (these are like the last thing on my todo list)
* If you live in Seattle, buy me some more beer. pls
