//The CDN versions of calcite.css and esri.css behave more consistently than the dojo built versions, which is why I'm including this to download those hosted resources locally

"use strict";

var http = require('http');
var fs = require('fs');

var resources = ["http://js.arcgis.com/3.17/esri/themes/calcite/dijit/calcite.css","http://js.arcgis.com/3.17/esri/themes/calcite/esri/esri.css"];

var destination = process.argv[2];
if(!fs.existsSync(destination)){
	fs.mkdirSync(destination);
}

for (var i=0; i<resources.length; i++){
	var components = resources[i].split("/");
	var name = components[components.length -1];
	var loc = [destination,name].join("\\");
	downloadFile(loc, resources[i]);
}

function downloadFile(fileName, resource){
	var request = http.get(resource, function(response){
		var data="";
		response.on('data', function(chunk){
			data += chunk;
		});
		response.on('end', function(){
			fs.writeFile(fileName, data);
		});
	});
}