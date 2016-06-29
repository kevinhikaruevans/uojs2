# uojs2

An online client for the popular game Ultima Online. PLEASE submit a PR if you would like to contribute!!! I could definitely use help maintaining a non-shitty codebase.

[![Slack Status](http://kevinhikaruevans.com:3000/badge.svg)](http://kevinhikaruevans.com:3000/)
[![Travis build status](http://img.shields.io/travis/kevinhikaruevans/uojs2.svg?style=flat)](https://travis-ci.org/kevinhikaruevans/uojs2)
[![Code Climate](https://codeclimate.com/github/kevinhikaruevans/uojs2/badges/gpa.svg)](https://codeclimate.com/github/kevinhikaruevans/uojs2)
[![Test Coverage](https://codeclimate.com/github/kevinhikaruevans/uojs2/badges/coverage.svg)](https://codeclimate.com/github/kevinhikaruevans/uojs2)
[![Dependency Status](https://david-dm.org/kevinhikaruevans/uojs2.svg)](https://david-dm.org/kevinhikaruevans/uojs2)
[![devDependency Status](https://david-dm.org/kevinhikaruevans/uojs2/dev-status.svg)](https://david-dm.org/kevinhikaruevans/uojs2#info=devDependencies)

## What this is:

It's going to be a working version of my original client, uojs. My goal is to have a cleaner and more modular codebase than my last project. 

Ideally, it won't be dependent on the server and it should emulate the latest 2d client fully. Buuuut, I'm doing all my testing with [ServUO](https://github.com/ServUO/ServUO).

~~I'm looking into using Redux to manage the state.~~ unf, I'm using redux in the `redux` branch :+1:

## Current Status

I barely have networking working (as of 2016-06-10). It uses websockify to proxy the websocket into a tcp socket. Once I get that working well, I'll start on adding an interface. :+1:
