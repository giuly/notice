# Project Title

Javascript Notice Task Assignemnt

## Requirements

Write a method, that accepts 2 parameters: 
1. data array (from data.js)
2. object with filtering parameters.

After applying filtering, it displays matched results in console.

### Prerequisites

- nodejs
- karma, karma-jasmine, karma-chrome-launcher, karma-cli

### Instaling [on Ubuntu, only if you want to run the script from console and also, run unit tests]
Install node and npm:
	sudo apt-get install nodejs
Install Karma: 
	npm install karma --save-dev
Install Jasmine and Chrome Plugin: 
	npm install karma-jasmine karma-chrome-launcher --save-dev 
Install Commandline Interface: 
	npm install -g karma-cli
Karma Configuration: default, apart from the scripts that are loaded. This is set in conf.js, line: 17-21

## Run

There are 2 options:
1. Access index.html via Browser and open the console to check the results
2. From console under the command:
	node js/script.js

## Running the tests
Run karma Test:
	 karma start js/conf.js --single-run

## Description

* I cosidered best practice to write some unit tests just to make sure if any modifications won't change the output of `customFilter` function.




