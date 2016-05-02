# Calcite Dojo Build Template

This project combines two components from Esri's JavaScript resources for developers, and allows users to quickly create custom dojo builds and deploy applications using v3.15+ of Esri's JavaScript API with the Calcite design theme.  The framework is compatible with [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), though can be modified to use [Esri Leaflet](https://github.com/Esri/esri-leaflet). 

The first component is from [jsapi-resources] (https://github.com/Esri/jsapi-resources), which outlines how to use Bower, Grunt, and Node to make a custom build of the Esri JavaScript API v3.15+.  This resource provides the bower.json, build.profile.js, package.json, and gruntfile.js files necessary to create local custom builds of their API for faster app development and deployment.  The instructions for this component were largely gleaned from a [tutotrial] (https://developers.arcgis.com/javascript/jshelp/inside_bower_custom_builds.html) on Esri's webiste. 

The second component is from [calcite-maps] (https://github.com/Esri/calcite-maps), which provides a framework and some examples to build apps from Esri's recently released [calcite-bootstrap] (http://esri.github.io/calcite-bootstrap/).   Since v4.0 of Esri's JS API is not yet available as a Bower package, the project uses a 3.x example for the page template.  

### Requirements
* [node & npm](https://nodejs.org/)
* [bower](http://bower.io/)
* [grunt](http://gruntjs.com/)
* [java 7 or greater](https://java.com/en/download/) - for [Closure Compiler](https://github.com/google/closure-compiler) used during build

### Usage
* `npm install -g bower` - installs bower
* `npm install -g grunt-cli` - installs global grunt
* `npm install` - installs required node and bower packages
* `npm run clean` - removes built files from `dist` directory
* `npm run build` - run the Dojo build on application

###Getting Started<a id="getting-started"></a>

1. Make sure you have all requirements from above installed

2. Fork or clone the repo

3. Use `npm install` to download all dependencies (Esri's JS API and calcite-bootstrap theme), build css from sass, and other grunt tasks

4. Modify index.html and the main.js and app.css in src/app to build out your application

5. Use `npm run build` to build dojo, minify your JavaScript, and copy necessary files to your dist folder 

6. Deploy your app
