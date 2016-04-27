var map, searchWidgetNav, searchWidgetPanel, activeView;
require(["esri/map",
		"esri/dijit/Search",
		"dojo/query",
		"dojo-bootstrap/Collapse",
		"dojo-bootstrap/Dropdown",
		"dojo-bootstrap/Tab",
		"dojo-bootstrap/Tooltip",

		"js/dojo/calcitemaps",

		"dojo/domReady!"
	], function (Map, Search, query) {

	// Map
	map = new Map("mapViewDiv", {
			basemap : "dark-gray",
			center : [-97, 38], // lon, lat
			zoom : 5
		});
	//map.popup.anchor = "top";

	// Search
	map.on('load', initSearch);
	function initSearch(layer) {
		console.log("initing search");
		searchDivNav = createSearchWidget("searchNavDiv");
		searchWidgetPanel = createSearchWidget("searchPanelDiv");
	}
	function createSearchWidget(parentId) {
		var search = new Search({
				map : map,
				enableHighlight : false
			}, parentId);
		search.startup();
		// Set active view
		// search.watch(function(property, oldValue, newValue){
		//     if (property === "searchResults") {
		//         search.view = activeView;
		//     }
		// });
		return search;
	}
	query("#selectBasemapPanel").on("change", function (e) {
		map.setBasemap(e.target.options[e.target.selectedIndex].value);
	});
}); // dojo