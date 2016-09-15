/**
 * Happy.js
 *
 * @description: Get reviews and comments as Google Analytics events
 * @param {string} id - Form wrapper id
 * @param {string} category - Event tracking category
 * @param {string} title - Name of entity that you are reviewing (FAQ item, Page, etc)
 */

var Happy = function( el, category ) {

	var self = this;

	// Assign some properties
	this.el = el;
	this.category = category;
	this.action = this.el.dataset.title;
	this.translations = {
		'Satisfied': 'Tevreden',
		'Dissatisfied': 'Ontevreden'
	};

	// Show form
	this.showElement( 'happy__review' );

	// Someone clicks yes
	this.el
		.getElementsByClassName( 'js-happy-yes' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			self.hideElement( 'happy__review' );
			self.showElement( 'happy__thanks' );
			self.trackEvent( 
				self.translations['Satisfied'], 
				true,
				true
			);
		}, false);

	// Someone clicks no
	this.el
		.getElementsByClassName( 'js-happy-no' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			self.hideElement( 'happy__review' );
			self.showElement( 'happy__comment' );
			self.trackEvent( 
				self.translations['Dissatisfied'], 
				false,
				true
			);
		}, false);

	// Someone sends feedback
	this.el
		.getElementsByClassName( 'js-happy-comment' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			var comment = self.el
				.getElementsByClassName( 'js-happy-feedback' )[0]
				.value;

			self.hideElement( 'happy__comment' );
			self.showElement( 'happy__thanks' );
			self.trackEvent( comment, false, false );
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
 * @param {string} label - Event tracking label
 * @param {boolean} isSatisfied - True if event is a positive review
 * @param {boolean} isReview - True if event is a review
 */
Happy.prototype.trackEvent = function( label, isSatisfied, isReview ) {

	dataLayer.push({
		event: 'happy',					// Tag Manager Custom Event
		eventCategory: this.category,	// Event tracking category
		eventAction: this.action,		// Event tracking action
		eventLabel: label,				// Event tracking label
		eventValue: + isSatisfied,		// Event tracking value (convert to number with +)
		isSatisfied: + isSatisfied,		// Custom metric, counts satisfied customers
		isReview: + isReview			// Custom metric, counts number of reviews
	});
};


/**
 * Track widgets
 *
 * @description: Helper function to track multiple widgets
 * @param {string} eventCategory - Event tracking category
 * @param {string} className - Widget classname, defaults to 'happy'
 */
var trackWidgets = function( eventCategory, className ) {

	// Set default className
	if (typeof className === 'undefined') { className = 'happy'; }

	// Check browser compatibility
	if( 'addEventListener' in window ) {

		var widgets = document.getElementsByClassName( className );
		
		// Loop over all widgets
		for( var i = 0; i < widgets.length; i++ ) {
			var widget = new Happy( widgets[i], eventCategory );
		}
	}
};