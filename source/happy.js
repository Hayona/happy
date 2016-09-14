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
				true,
				true
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
				false,
				true
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
			self.trackEvent( self.category, self.action, comment, false, false );
		}, false);
};


/**
 * Show element
 * 
 * @description: Set element to display: block; by className
 * @param {string} className
 */
Happy.prototype.showElement = function( className ) {
	var el = this.el.getElementsByClassName( className )[0];
	el.style.display = 'block';
};


/**
 * Hide element
 *
 * @description: Set element to display: hidden; by className
 * @param {string} className
 */
Happy.prototype.hideElement = function( className ) {
	var el = this.el.getElementsByClassName( className )[0];
	el.style.display = 'none';
};


/**
 * Track event
 *
 * @description: Push a GTM custom event with event tracking values and some custom metrics
 * @param {string} category - Event tracking category
 * @param {string} action - Event tracking action
 * @param {string} label - Event tracking label
 * @param {boolean} isSatisfied - true if event is a positive review
 * @param {boolean} isReview - true if event is a review
 */
Happy.prototype.trackEvent = function( category, action, label, isSatisfied, isReview ) {

	dataLayer.push({
		event: 'happy',					// Tag Manager Custom Event
		eventCategory: category,		// Event tracking category
		eventAction: action,			// Event tracking action
		eventLabel: label,				// Event tracking label
		eventValue: + isSatisfied,		// Event tracking value (convert to number with +)
		isSatisfied: + isSatisfied,		// Custom metric, counts satisfied customers
		isReview: + isReview			// Custom metric, counts number of reviews
	});
};