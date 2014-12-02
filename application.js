/* This file contains application-specific code */

$Bh.log("Go!");

// BUTLER.configuration.init({username: "fabrice", password: "fabrice", useProxy: true});
BUTLER.configuration.init({username: "hackathon02", password: "hackathon02", useProxy: false});


// console.log("111gateway...");
// BUTLER.gateway.getDevices("http://10.0.0.49:8080/butler", function(devices) {
// 	console.log("= = = = = = = =>" + devices + "<= = = = = = = = = =");
// 	console.log("top");
// 	devices = JSON.parse(devices);
// 	$.each(devices, function(k, v) {
// 		console.log(k + " - " + v);
// 	});
// });
// console.log("gateway ok");



// $Bs.sendResourceRequest({resource: "http://butler.teamlife.it/butler/profile/v1/people/up-test11/@self",
// 																			 parameters: "",
// 																			 //requestIdentifier: "1234"
// 																			 success: function(data) {
// 																			 	 profile = JSON.parse(data);
// 																			 	 console.log("==>"+profile.appData+"<--");
// 																			 	 $Bh.log("OK!");
// 																			 	 //$Bh.log("OK! Result: " + data);
// 																			 	 // $("#test1").append(JSON.parse(data).degrees);
// 																			 }, 
// 																			 error: function(data) {
// 																			 	 $Bh.log("KO :-(");
// 																			 	 // $Bh.log(data);
// 																			 }
// 																			});

var a;
// get profile
BUTLER.profile.getProfile(function(data) { 
	a = data;

	// update profile
	s = {"id":"hackathon02", "displayName":"Fabrice"};
	BUTLER.profile.updateProfile(s, function(data) { updatedProfile = data});
	
	}, 
	{});

function start() {
	console.log("0");
	$Bs.sendResourceRequest({resource: "http://philippechalet.gemalto.iot-butler.eu/ResourceProvider/temperature",
																			 parameters: "p=8&a=9",
																			 //requestIdentifier: "1234"
																			 success: function(data) {
																			 	 $Bh.log("Test #1: successfull call to the gateway! Result: " + data);
																			 	 $("#test1").append(JSON.parse(data).degrees);
																			 }, 
																			 error: function(data) {
																			 	 $Bh.log("Test #1: request to the gateway failed");
																			 }
																			});

  // $Bs.sendResourceRequestUnsecure({resource: "http://192.168.21.244:8080/butler/services/TemperatureService_ZLRT_COAP_0004/resources/temperature/GET",
		// 																					 success: function(data) {
		// 														  					 		 $Bh.log("Test #3: successfull call to the (unsecured) gateway! Result: " + data);
		// 														  					 		 $Bh.log("temp: " + JSON.parse(data).value);
		// 																				 	 	 $("#test2").append(JSON.parse(data).value);
		// 																			 		 }, 
		// 																			     error: function(data) {
		// 																			 		   $Bh.log("Test #3: request to the (unsecured) gateway failed");
		// 																			 		 }
		// 																					});

	// $Bs.sendResourceRequest({resource: "http://192.168.21.244:8080/temperature",
	// 																		 success: function(data) {
	// 																		 	 $Bh.log("Test #2: successfull call to the gateway! Result: " + data);
	// 																		 	 $("#test3").append(JSON.parse(data).degrees);
	// 																		 }, 
	// 																		 error: function(data) {
	// 																		 	 $Bh.log("Test #2: request to the gateway failed");
	// 																		 }
	// 																		});

	// $Bs.sendResourceRequestUnsecure({resource: "http://inno.smart-gateway.iot-butler.eu:8080/butler/services/ExternalTemperatureService_coap%3A%2F%2F%5Baaaa%3A0000%3A0000%3A0000%3Ac30c%3A0000%3A0000%3A0002%5D/resources/etemp/GET",
	// 																						 success: function(data) {
	// 															  					 		 $Bh.log("Test #4: successfull call to the (unsecured) gateway! Result: " + data);
	// 															  					 		 $Bh.log("temp: " + JSON.parse(data).value);
	// 																					 	 	 $("#test4").append(JSON.parse(data).value);
	// 																				 		 }, 
	// 																				     error: function(data) {
	// 																				 		   $Bh.log("Test #4: request to the (unsecured) gateway failed");
	// 																				 		 }
	// 																						});

}

$("#go").click(function() {
	$(".test .sensor").html("");
	$Bh.clearLogs();
	start();
});

$("#clear").click(function() {
	$Bst.clear();
	$(".test .sensor").html("");
	$Bh.log("Local storage cleared.");
});


// console.log("testing notifications...");


// $Bh.log("end of application.js reached...");