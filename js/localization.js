BUTLER.localization = (function () {

	function getLocalization(smartObjectID, typeLoc, timeIn, complete) {
		server = BUTLER.configuration.get("localizationServerURL");
		$.getJSON(server + "/" + smartObjectID + "/localization/" + typeLoc + "/q?timeIn=last", function(data) {
  				complete(data);
  			});
	};

	function getDevices(complete) {
		$.getJSON(BUTLER.configuration.get("localizationServerURL"), function(data) {
  				devices = jQuery.grep(data, function( n, i ) {
  					// returns only mobile devices
  					return ( n.indexOf("Mobile") > -1 );
				});
  				complete(devices);
  			}
		);
	};

	return {
		getLocalization: getLocalization,
		getDevices: getDevices
	}
})();


// console.log(BUTLER.configuration.get("localizationServerURL"));
// var  a;
// console.log(BUTLER.localization.getDevices(function(data) { console.log(data); a = data; } ));

// console.log(BUTLER.localization.getLocalization("ZPOSMobileDevice-9340351261200161", "rel", 0, function(data) { console.log(data.x_local_coord); }));



