BUTLER.storage = (function () {

	return {
		isLocalStorageSupported: function() {
			try {
			  console.log("LocalStorage supported.")
			  return 'localStorage' in window && window['localStorage'] !== null;
			} catch (e) {
			  console.log("LocalStorage not supported.")
			  return false;
			}
		},
		getTrustTokenFromCache: function(scope) {
	    	return (this.isLocalStorageSupported() != true) ? null : localStorage.getItem(scope); 
	  	},
        getKeysMaterialFromCache: function(keyid) {
	    	return (this.isLocalStorageSupported() != true) ? null : localStorage.getItem(keyid); 
	  	},
	  	getItem: function(key) {
	  		localStorage.getItem(key);
	  	},
	  	setItem: function(key, value) {
	  		localStorage.setItem(key, value);
	  	},
	  	removeItem: function(key) {
	  		localStorage.removeItem(key);
	  	},
	  	clear: function() {
	  		localStorage.clear();
	  	}
	};
})();