BUTLER.profile = (function () {
	
	function getProfile(success, error) {
		$Bs.sendResourceRequest({resource: BUTLER.configuration.get("profileServerURL") + BUTLER.configuration.get("username") + "/@self",
			 success: function(data) {
			 	 profile = JSON.parse(data);
			 	 $Bh.log("Profile retrieved.");
			 	 success(profile);
			 }, 
			 error: function(data) {
			 	 $Bh.log("BUTLERjs failed to load the user profile.");
			 	 error(data);
			 	 // $Bh.log(data);
			 }
			});
	}

	function updateProfile(profile, success, error) {
		// console.log("--->" + profile);
		profile = JSON.stringify(profile);
		// console.log("--->" + profile);
		$Bs.sendResourceRequest({resource: BUTLER.configuration.get("profileServerURL") + BUTLER.configuration.get("username") + "/@self",
			 verb: "SET",
			 parameters: profile,
			 success: function(data) {
			 	 profile = JSON.parse(data);
			 	 $Bh.log("Profile updated.");
			 	 success(profile);
			 }, 
			 error: function(data) {
			 	 $Bh.log("BUTLERjs failed to update the user profile.");
			 	 error(data);
			 	 // $Bh.log(data);
			 }
			});
	}

	return {
		getProfile: getProfile,
		updateProfile: updateProfile
		// register: register,
		// login: login,
		// deleteAccount: deleteAccount,
		// profileLogin: profileLogin
	};
})();
