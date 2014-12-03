BUTLERjs
========

BUTLERjs is a Javascript library that makes [BUTLER](http://www.iot-butler.eu) services available within web applications. As an example, the [iot-map app](http://iotmap.iot-butler.eu) has been developed with BUTLERjs.

BUTLERjs is documented on the OpenPlatforms website: http://open-platforms.eu/library/butler-js/. 

**Note**: the security feature that is presented in BUTLER deliverables is not provided in the open source version of BUTLERjs due to licensing restrictions. 

BUTLERjs has been developed with the following tools:

* Ruby (2.1.0)
* jQuery
* [Twitter Bootstrap](http://getbootstrap.com/) (v3.1.1)
* [CryptoJS](http://code.google.com/p/crypto-js) (v3.1.2)
* [NodeJS](http://nodejs.org/)
* [Faye](http://faye.jcoglan.com/)
* [PNotify](http://sciactive.com/pnotify/) (v2.0.1)

Simply get the code ([download the archive](https://github.com/butler-fp7/butlerjs/archive/master.zip) or clone the repo) to start playing with it. 

## How to build it?

BUTLERjs is composed by a set of Javascript files (from BUTLER along with additionnal libraries). In order to build the mininied version of BUTLERjs, run the following command `./build.sh` (worth noting that this build script will also minified CSS files).

## App skeleton

BUTLERjs comes with a skeleton app that can be used as a starting point for developing BUTLER app. The skeleton is generated every time the build command is called. To use it, unzip the butlerjs-skeleton.tgz file. 

For convinience, a simple web server is provided (nodejs required). Start it with `./server.js` and go to http://localhost:8000 to see the app. 

Custom app code can then be placed in:

* application.js for custom Javascript;
* appcation.css for custom CSS.