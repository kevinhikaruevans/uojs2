# uojs2


An unfinished web-based client for the game Ultima Online.

[![Join the chat at https://gitter.im/uojs2/Lobby](https://badges.gitter.im/uojs2/Lobby.svg)](https://gitter.im/uojs2/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Travis build status](http://img.shields.io/travis/kevinhikaruevans/uojs2.svg?style=flat)](https://travis-ci.org/kevinhikaruevans/uojs2)
[![Dependency Status](https://david-dm.org/kevinhikaruevans/uojs2.svg)](https://david-dm.org/kevinhikaruevans/uojs2)
[![devDependency Status](https://david-dm.org/kevinhikaruevans/uojs2/dev-status.svg)](https://david-dm.org/kevinhikaruevans/uojs2#info=devDependencies)
[![Build status](https://ci.appveyor.com/api/projects/status/o36x2d6fef7b282a/branch/master?svg=true)](https://ci.appveyor.com/project/kevinhikaruevans/uojs2/branch/master)

## Overview

This project is aiming to emulate the game Ultima Online (ver 7.x.x.x) in a web enviroment. It uses websockets (with websockify) to connect to servers that utilize the Ultima Online protocol. It then uses Redux to manage the global state and uses React coupled with three.js for the interface.


I'm mostly using this project to learn more about cool features in javascript. So please let me know if there is a better way to do something.

Also! Please know that this is completely a work in progress and it doesn't do anything spectacular (yet). Please don't tell me that it doesn't work. I know it doesn't work. It will be finished one day, assuming that I don't (1) die in an accident, (2) become homeless, or (3) get burned out from programming.

## Current Status

Networking, decompression, global state, React works.

Graphics are currently being worked on. We're using [react-three-renderer](https://github.com/toxicFork/react-three-renderer) for this.

## Requirements

### Browser requirements

* WebGL support
* Websocket support

### Development & hosting requirements

* Node.js, version 6+
* ServUO (or possibly an alternative)


## Getting Started

0. Start your ServUO server.
1. Clone the repository. Edit `configs/development.js` as needed.
2. Install dependencies: `yarn install` or `npm install`
3. In a terminal window, start the websocket proxy and server: `yarn run development`
4. Open http://localhost:8080/

## Contributing

Here are some ways you can contribute to this project!

* Check out the issues tab and look for things to work on.
* Implement more of the packets. Check out the `state` directory for examples. 
* Add in pages in the [Wiki](https://github.com/kevinhikaruevans/uojs2/wiki)
* Write tests

![ga](https://ga-beacon.appspot.com/UA-38326743-3/welcome-page?pixel)

[SUO]: https://github.com/ServUO/ServUO
