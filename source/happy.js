(function () {
	
	var hasGivenFeedback = Cookies.get('hayona_happy');


	var showElement = function( className ) {
		var el = document.getElementsByClassName( className )[0];
		el.style.display = 'block';
	};

	var hideElement = function( className ) {
		var el = document.getElementsByClassName( className )[0];
		el.style.display = 'none';
	};


	// Show the form
	if( hasGivenFeedback !== 'true' ) {
		showElement( 'hayona-happy__form' );
	} else {
		showElement( 'hayona-happy__thanks' );
	}


	// Someone clicks yes
	document.getElementsByClassName( 'js-hayona-happy-yes' )[0].addEventListener('click', function() {
		hideElement( 'hayona-happy__form' );
		showElement( 'hayona-happy__thanks' );

		// Users are allowed to vote once per session
		Cookies.set('hayona_happy', 'true');
	}, false);

	// Someone clicks no
	document.getElementsByClassName( 'js-hayona-happy-no' )[0].addEventListener('click', function() {
		hideElement( 'hayona-happy__form' );
		showElement( 'hayona-happy__feedback' );

		// Users are allowed to vote once per session
		Cookies.set('hayona_happy', 'true');
	}, false);

	// Someone sends feedback
	document.getElementsByClassName( 'js-hayona-happy-thanks' )[0].addEventListener('click', function() {
		hideElement( 'hayona-happy__feedback' );
		showElement( 'hayona-happy__thanks' );

		// Users are allowed to vote once per session
		Cookies.set('hayona_happy', 'true');
	}, false);

})();