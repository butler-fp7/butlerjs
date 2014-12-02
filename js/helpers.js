BUTLER.helpers = (function () {

	return {
		log: function(message){
			if (BUTLER.configuration.get("debug") == true) {
				console.log(message);
			}
    		debug_area = $("#console");
			if (console.length != 0) {
				var text;
				try {
					m = message.split(": ");
					m[0] = "<b>" + m[0] + "</b>"
					text = m.join(": ");
				} catch (e) {
					text = message;
				}
				debug_area.append(text + "<br>");
			}
		},
		clearLogs: function() {
			$("#console").empty();
	  }
	}
})();

