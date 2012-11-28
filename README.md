# MosaicTool
by *Jason Block*
Final Project, SSUI Web Lab, Winter 2012

## How to install

First, clone the repo somewhere. Doesn't matter where.

You'll need NPM for grunt so you can build everything out to run locally. I used [Anvil](http://anvilformac.com) to run this locally, but it's not entirely necessary. Just opening the index.html file should be sufficient. 

You'll need [Grunt](http://gruntjs.com) to build out the javascript, since everything is modularized in a whole mess of different files. 

	npm install -g grunt

Then all you have to do is build for production:

	grunt build-production

Everything will be nice and minified and built (and tossed in the lib folder). 

### Libraries/Dependencies

- [JQuery](http://jquery.org): Selector library
- [Backbone](http://backbonejs.org): MV* framework
- [Lo-dash](http://lodash.com): A slightly more performant [UnderscoreJS](http://underscorejs.org)
- [Grunt](http://gruntjs.com): CLI build tool