BUTLER.gateway = (function () {

	function getDevices(gatewayURL, complete) {
		console.log(gatewayURL + "/devices");
		$.getJSON(gatewayURL + "/devices", function(devices) {
  				complete(devices);
  			});
	};

	function getDeviceDetails(gatewayURL, deviceId, complete) {
		$.getJSON(gatewayURL + "/devices/" + deviceId, function(device) {
  				complete(device);
  			}
		);
	};

	function getDeviceServices(gatewayURL, deviceId, complete) {
		$.getJSON(gatewayURL + "/devices/" + deviceId + "/services", function(device) {
  				complete(device);
  			}
		);
	};

	function getServiceDescription(gatewayURL, deviceId, serviceId, complete) {
		$.getJSON(gatewayURL + "/devices/" + deviceId + "/services/" + serviceId, function(device) {
  				complete(device);
  			}
		);
	};

	function getServiceResources(gatewayURL, deviceId, serviceId, complete) {
		$.getJSON(gatewayURL + "/devices/" + deviceId + "/services/" + serviceId + "/resources", function(device) {
  				complete(device);
  			}
		);
	};

	function getResourceDescription(gatewayURL, deviceId, serviceId, resourceName, complete) {
		$.getJSON(gatewayURL + "/devices/" + deviceId + "/services/" + serviceId + "/resources/" + resourceName, function(device) {
  				complete(device);
  			}
		);
	};


	function getResourceValue(gatewayURL, deviceId, serviceId, resourceName, complete) {
		$.getJSON(gatewayURL + "/devices/" + deviceId + "/services/" + serviceId + "/resources/" + resourceName + "/GET", function(device) {
  				complete(device);
  			}
		);
	};

	return {
		getDevices: getDevices,
		getDeviceDetails: getDeviceDetails,
		getDeviceServices: getDeviceServices,
		getServiceDescription: getServiceDescription,
		getServiceResources: getServiceResources,
		getResourceDescription: getResourceDescription,
		getResourceValue: getResourceValue
	}
})();


// $Bg.getDevices(function(data) { console.log(data); a = data; } ));

// console.log(BUTLER.localization.getLocalization("ZPOSMobileDevice-9340351261200161", "rel", 0, function(data) { console.log(data.x_local_coord); }));



