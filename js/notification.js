BUTLER.notification = (function () {
	
	function enableNotifications() {
		PNotify.prototype.options.styling = "bootstrap3";
		PNotify.prototype.options.history = BUTLER.configuration.get("notificationsHistory");	
		var client = new Faye.Client(BUTLER.configuration.get("notificationServerURL"));


		var subscription = client.subscribe(BUTLER.configuration.get('notificationsChannel'), function(message) {
			new PNotify({
				title: BUTLER.configuration.get('notificationNewMessageHeader'),
				text: message
			});
		  	console.log(message)
		});
	};

 	return {
 		enableNotifications: enableNotifications
 	}
})();

if (BUTLER.configuration.get('disableNotifications') == false) {
	BUTLER.notification.enableNotifications();
}
