# Happy

Track reviews and comments as Google Analytics events by pasting a small HTML widget on your page. 

![Widget demo](http://g.recordit.co/fOu49Fvrve.gif)

## Dependancies

You need [Google Tag Manager](https://tagmanager.google.com/) and [Google Analytics](https://analytics.google.com) installed on your site before you can use this widget.

## Installation

### Step 1: Include the widget in your page: 

```xml
<div class="happy">
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

### Step 2: Include JavaScript and CSS 

Include the JavaScript and CSS source files at the bottom of your page, right before the closing ```</body>``` tag. 

```xml
<link rel="stylesheet" href="../source/min/happy-min.css" media="screen">
<script src="../source/min/happy-min.js"></script>
<script>new Happy();</script> 
```

### Step 3: Configure Google Tag Manager

Inside Google Tag Manager you can read all events from the ```dataLayer``` and send them to Google Analytics. 

Sample container is coming soon.

## Options

### Widget title

You can set a widget title in the ```data-title``` attribute of the widget. This title will show up as Event Action in Google Analytics. For example:

```xml
<div class="happy" data-title="FAQ: Question #1521">
```

### Translations

You can provide some translations like this: 

```xml
<script>
    new Happy({
        eventCategory: 'Tevredenheid',
        eventLabelSatisfied: 'Tevreden',
        eventLabelDissatisfied: 'Ontevreden'
    });
</script>
```

### Widget class name

Use your own class name like this

```xml
<script>
    new Happy({
        className: 'my-custom-widget-classname'
    });
</script>
```
