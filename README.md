# uojs2


A web-based client for the game Ultima Online.

[![Join the chat at https://gitter.im/uojs2/Lobby](https://badges.gitter.im/uojs2/Lobby.svg)](https://gitter.im/uojs2/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Travis build status](http://img.shields.io/travis/kevinhikaruevans/uojs2.svg?style=flat)](https://travis-ci.org/kevinhikaruevans/uojs2)
[![Dependency Status](https://david-dm.org/kevinhikaruevans/uojs2.svg)](https://david-dm.org/kevinhikaruevans/uojs2)
[![devDependency Status](https://david-dm.org/kevinhikaruevans/uojs2/dev-status.svg)](https://david-dm.org/kevinhikaruevans/uojs2#info=devDependencies)

## Overview

This project is aiming to emulate the game Ultima Online (ver 7.x.x.x) in a web enviroment. It uses websockets (with websockify) to connect to servers that utilize the Ultima Online protocol. It then uses Redux to manage the global state and uses React coupled with three.js for the interface.


I'm mostly using this project to learn more about cool features in javascript. So please let me know if there is a better way to do something.

Also! Please know that this is completely a work in progress and it doesn't do anything spectacular (yet). Please don't tell me that it doesn't work. I know it doesn't work. It will be finished one day, assuming that I don't (1) die in an accident, (2) become homeless, or (3) get burned out from programming.

## Current Status

Networking, decompression, global state, React (sorta) works. Three.js still needs to be integrated within the React component.

There also needs to be an art server and a way to quickly transfer art between the server and client. WebP + http2? maybe? no idea. Will research ideal image formats: gif is small, has a single alpha channel, and has limited colors... so this might be ideal.

## Requirements

### Browser requirements

* Modern browser
* WebGL support
* Websocket support

### Development & hosting requirements

* Node.js, version 6+
* ServUO (or possibly an alternative)


## Getting Started

0. Start your ServUO server. Edit `src/server/config.js` if needed.
1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `gulp build` (or `gulp watch`)
4. Start websockify: `npm start` (this might not work)
5. Open index.html
6. Eat sandwich

## Contributing

Here are some ways you can contribute to this project!

* Implement more of the packets. Check out the `state` directory for examples. 
* Create a UI. I'm thinking if the state has an 'invalidate' flag, so that when set to true, it'll call a redraw in the redux subscribe method, which just rerenders the viewport. Does that make sense? I have no idea.
* Code review it! If you're a hardcore javascripter (is that a word?), I really want you to tell me what can be improved on here. 
* Add in pages in the [Wiki](https://github.com/kevinhikaruevans/uojs2/wiki/A-general-overview-of-everything)
* Write tests (these are like the last thing on my todo list)
* Migrate everything into web workers (particularly networking, redux stuff, and decompression). Then on the redux subscribe callback, transfer the data into the main UI thread?
* If you live in Seattle, buy me some more beer. pls :beer:

![ga](https://ga-beacon.appspot.com/UA-38326743-3/welcome-page?pixel)
