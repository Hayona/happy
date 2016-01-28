(function () {
	
	var showElement = function( className ) {
		var el = document.getElementsByClassName( className )[0];
		el.style.display = 'block';
	};

	var hideElement = function( className ) {
		var el = document.getElementsByClassName( className )[0];
		el.style.display = 'none';
	};


	// Show the form if JavaScript is enabled in the browser
	showElement( 'hayona-happy__form' );


	// Someone clicks yes
	document.getElementsByClassName( 'js-hayona-happy-yes' )[0].addEventListener('click', function(e) {
		e.preventDefault();
		hideElement( 'hayona-happy__form' );
		showElement( 'hayona-happy__thanks' );
	}, false);

	// Someone clicks no
	document.getElementsByClassName( 'js-hayona-happy-no' )[0].addEventListener('click', function(e) {
		e.preventDefault();
		hideElement( 'hayona-happy__form' );
		showElement( 'hayona-happy__feedback' );
	}, false);

	// Someone sends feedback
	document.getElementsByClassName( 'js-hayona-happy-thanks' )[0].addEventListener('click', function(e) {
		e.preventDefault();
		hideElement( 'hayona-happy__feedback' );
		showElement( 'hayona-happy__thanks' );
	}, false);

})();