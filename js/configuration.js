BUTLER.configuration = (function () {

	var config = {
    debug: true,
    alwaysRequestNewToken: false, // if true, does not use token stored locally
    useProxy: false,
    proxyURL: "http://10.0.0.55:9000/",
    // application secrets 
    clientId: "22048d42d46398c89378",
    clientSecret: "abb7bb7a4f8940d3b5d034d969de144ce722fd54",
    applicationPrivateIdentifier: "37adc08f6963cecc59b6",
    
    // user credentials
    // username: "fabrice",
    // password: "fabrice",
    profileServerURL: "http://butler.teamlife.it/butler/profile/v1/people/",
    profileLoginPrefix: "BUTLER_",

    // authentication server
    trustManagerURL: "https://trustmanager.gemalto.iot-butler.eu/api/oauth2/access_token",
    trustManagerKeysURL : "https://trustmanager.gemalto.iot-butler.eu/api/session_keys/",
    
    // localization
    localizationServerURL: "http://localizationmanager.ismb.iot-butler.eu/api/v1/objects",
    
    // misc
    ivLength: 16,
    signRRData: true,  //sign Request Response data
    signRAData: true,  //sign Request Authentication data
    signToken: true,  //sign Token data
    
    // notification
    notificationServerURL: "http://notifier.iot-butler.eu:9000/push", //"http://notifier.iot-butler.eu:9000/push",
    disableNotifications: false,
    notificationsHistory: false,
    notificationNewMessageHeader: "New message!",
    notificationsChannel: "/messages/butler"
  };

	return {
		// override the current configuration
    config: config,
		get: function(key) {
			return config[key];
		},
	  set: function(key, value) {

    	config[key] = value;
 		},
	  init: function(conf) {
     	//  	if ( typeof newConfig === "object" ) {
     	//    	this.myConfig = newConfig;
     	// 		}
      for (var key in conf) { 
        this.set(key, conf[key]);
      }    
 		},
    useProxy: function() {
      return this.get("useProxy");
    }
	};
})();