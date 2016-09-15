# Happy

Track reviews and comments as Google Analytics events by pasting a small HTML widget on your page. 

![Widget demo](http://g.recordit.co/fOu49Fvrve.gif)

## Dependancies

You need Google Tag Manager and Google Analytics installed on your site before you can use this widget.

## Installation

### Step 1: Include the widget in your page: 

```xml
<div class="happy" data-title="{{Edit this}}">
    <div class="happy__review" style="display: none;">
        <div class="happy__title">Was this article helpful?</div>
        <ul class="happy__answers">
            <li><a class="happy__button js-happy-yes" href="#">Yes</a></li>
            <li><a class="happy__button js-happy-no" href="#">No</a></li>
        </ul>
    </div>
    <div class="happy__comment" style="display: none;">
        <div class="happy__title">How can we improve?</div>
        <textarea name="customer-feedback" class="js-happy-feedback" cols="10" rows="3"></textarea>
        <button class="happy__button js-happy-comment">Send feedback</button>
    </div>
    <div class="happy__thanks" style="display: none;">
        <div class="happy__title">Thanks for your feedback!</div>
    </div>
</div>
```

Fill in the ```data-title``` with the name of the page or section you're getting reviews from. This title will show up as Event Label in Google Analytics. 

### Step 2: Include JavaScript and CSS 

Include the JavaScript and CSS source files at the bottom of your page, right before the closing ```</body>``` tag. You can edit the event tracking category to something like 'Page satisfaction'.

```xml
<link rel="stylesheet" href="../source/min/happy-min.css" media="screen">
<script src="../source/min/happy-min.js"></script>
<script>
    trackWidgets( 'Event tracking category' );
</script> 
```

### Step 3: Configure Google Tag Manager

Inside Google Tag Manager you can read all events from the ```dataLayer``` and send them to Google Analytics. 

Sample container is coming soon.
