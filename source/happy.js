/**
 * Happy.js
 *
 * @description: Get reviews and comments as Google Analytics events
 * @param {string} id - form wrapper id
 * @param {string} category - event tracking category
 * @param {string} title - Name of entity that you are reviewing (FAQ item, Page, etc)
 */

var Happy = function( id, category, title ) {

	var self = this;

	// Assign some properties
	this.el = document.getElementById( id );
	this.category = category;
	this.action = title;
	this.translations = {
		'Satisfied': 'Tevreden',
		'Dissatisfied': 'Ontevreden'
	};

	// Show form
	this.showElement( 'hayona-happy__form' );

	// Someone clicks yes
	this.el
		.getElementsByClassName( 'js-hayona-happy-yes' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			self.hideElement( 'hayona-happy__form' );
			self.showElement( 'hayona-happy__thanks' );
			self.trackEvent( 
				self.category, 
				self.action, 
				self.translations['Satisfied'], 
				1,
				1
			);
		}, false);

	// Someone clicks no
	this.el
		.getElementsByClassName( 'js-hayona-happy-no' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			self.hideElement( 'hayona-happy__form' );
			self.showElement( 'hayona-happy__feedback' );
			self.trackEvent( 
				self.category, 
				self.action, 
				self.translations['Dissatisfied'], 
				0,
				1
			);
		}, false);

	// Someone sends feedback
	this.el
		.getElementsByClassName( 'js-hayona-happy-thanks' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			var comment = self.el
				.getElementsByClassName( 'js-hayona-happy-customer-feedback' )[0]
				.value;

			self.hideElement( 'hayona-happy__feedback' );
			self.showElement( 'hayona-happy__thanks' );
			self.trackEvent( self.category, self.action, comment, 0, 0 );
		}, false);
};


/**
 * Show element
 */
Happy.prototype.showElement = function( className ) {
	var el = this.el.getElementsByClassName( className )[0];
	el.style.display = 'block';
};

/**
 * Hide element
 */
Happy.prototype.hideElement = function( className ) {
	var el = this.el.getElementsByClassName( className )[0];
	el.style.display = 'none';
};

/**
 * Track event
 */
Happy.prototype.trackEvent = function( category, action, label, isSatisfied, isReview ) {

	dataLayer.push({
		event: 'happy',					// Tag Manager Custom Event
		eventCategory: category,		// Event tracking category
		eventAction: action,			// Event tracking action
		eventLabel: label,				// Event tracking label
		eventValue: isSatisfied,		// Event tracking value
		isSatisfied: isSatisfied,		// Custom metric, counts satisfied customers
		isReview: isReview				// Custom metric, counts number of reviews
	});
};