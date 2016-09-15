/**
 * Happy
 *
 * @description: Find widgets on page and apply options to them
 * @param {object} options - See readme.md for all options
 */
var Happy = function( options ) {

	// Set properties
	this.className = options.className || 'happy';

	// Check browser compatibility
	if( 'addEventListener' in window ) {
		
		var widgets = document.getElementsByClassName( this.className );
		
		// Loop over all widgets
		for( var i = 0; i < widgets.length; i++ ) {
			var widget = new HappyWidget( 
				widgets[i], 
				options.eventCategory, 
				options.eventLabelSatisfied,
				options.eventLabelDissatisfied
			);
		}
	}
};




/**
 * HappyWidget
 *
 * @description: Widget object
 * @param {element} element - Widget wrapper element
 * @param {string} eventCategory - Translation of the word 'Customer satisfaction'
 * @param {string} eventLabelSatisfied - Translation of the word 'satisfied'
 * @param {string} eventLabelDisatisfied - Translation of the word 'dissatisfied'
 */

var HappyWidget = function( element, eventCategory, eventLabelSatisfied, eventLabelDissatisfied ) {

	var self = this;

	this.el = element;
	this.eventCategory = eventCategory || 'Customer satisfaction';
	this.eventLabelSatisfied = eventLabelSatisfied || 'Satisfied';
	this.eventLabelDissatisfied = eventLabelDissatisfied || 'Dissatisfied';

	// Retrieve event action from widget title if defined
	if( typeof( this.el.dataset.title ) === 'undefined' ) {
		this.eventAction = eventCategory;
	} else {
		this.eventAction = this.el.dataset.title;
	}
	
	// Show widget
	this.showElement( 'happy__review' );

	// Someone clicks yes
	this.el
		.getElementsByClassName( 'js-happy-yes' )[0]
		.addEventListener('click', function(e) {
			e.preventDefault();
			self.hideElement( 'happy__review' );
			self.showElement( 'happy__thanks' );
			self.trackEvent( 
				self.eventLabelSatisfied, 
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
				self.eventLabelDissatisfied, 
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
HappyWidget.prototype.showElement = function( className ) {
	var el = this.el.getElementsByClassName( className )[0];
	el.style.display = 'block';
};


/**
 * Hide element
 *
 * @description: Set element to display: hidden; by className
 * @param {string} className
 */
HappyWidget.prototype.hideElement = function( className ) {
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
HappyWidget.prototype.trackEvent = function( label, isSatisfied, isReview ) {

	dataLayer.push({
		event: 'happy',						// Tag Manager Custom Event
		eventCategory: this.eventCategory,	// Event tracking category
		eventAction: this.eventAction,		// Event tracking action
		eventLabel: label,					// Event tracking label
		eventValue: + isSatisfied,			// Event tracking value (convert to number with +)
		isSatisfied: + isSatisfied,			// Custom metric, counts satisfied customers
		isReview: + isReview				// Custom metric, counts number of reviews
	});
};