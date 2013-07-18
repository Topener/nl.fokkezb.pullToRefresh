# PullToRefresh Widget

## Overview
The *PullToRefresh* widget is an [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) implementation of the [TableView Refresh with headerPullView](http://docs.appcelerator.com/titanium/latest/#!/guide/TableView_Refresh_with_headerPullView) found in the docs for [Titanium](http://www.appcelerator.com/platform) by [Appcelerator](http://www.appcelerator.com).

## Screenshots
![Pull](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/pull.png)

![Release](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/release.png)

![Updating](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/updating.png)

## Features
* Initialize the widget through one simple call.
* Change (localize) any of the messages displayed.
* Manually trigger the widget, e.g. for first load.

## Future work
* Android and Mobile Web compatibility.

## Quick Start
* Download the latest [release](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh/releases).
* Unzip the file to `app/widgets/nl.fokkezb.pullToRefresh`.
* Add the widget as a dependency to your `app/config.json` file:
	
	```javascript
		"dependencies": {
			"nl.fokkezb.pullToRefresh":"1.2"
		}
	```

* Attach the widget to any *Ti.UI.TableView* and the method that needs to be called to load:

	```javascript
	var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh', null, {
		table: $.myTable,
		loader: myLoaderCallback
	});
	```
	
* Your *myLoaderCallback* will receive a callback as its first and only argument. This callback should be called upon completion so the headerPullView can be closed. For example:

	```javascript
	function myLoaderCallback(widgetCallback) {
		// DO YOUR LOADING
		widgetCallback();
	}
	```
	
## Styling
The widget can be fully styled without touching the widget source. Use the following ID's in your app's `app.tss` to override the default style:

| ID | Description |
| -- | ----------- |
| #ptr | The background of the headerPullView |
| #ptrCenter | Centers the contents, you probably only want to change `bottom` in conjuction with using the `height` parameter mentioned further on. |
| #ptrArrow | The arrow image. Use `WPATH('/images/white.png')` to use the white instead of the default grey image, or roll your own. |
| #ptrIndicator | The activityIndicator showing during load |
| #ptrText | The text |

## Parameters
The only required parameters are the `table` and `loader` parameters, but there's more. I you re-style the widget you might need to change the pulled `height`. And instead of using a `strings.xml` file you can also override the default texts using the following parameters:

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| table | `Ti.UI.TableView` | Table to attach to |
| loader | `function` | Function to call when pulled |
| height | `number` | Height of the headerPullView during load (default: `50`) |
| msgPull | `string` | Overrides `Pull to refresh…` |
| msgRelease | `string`  | Overrides `Release to refresh…` |
| msgUpdating | `string` | Overrides `Updating…` |

## Methods
You can also manually show and hide the view or trigger the complete cycle of the widget. Use this for example upon first load of the table or to show as long the table is empty.

| Function | Parameters | Usage |
| -------- | ---------- | ----- |
| trigger  |            | Manually trigger show > load > hide cycle 
| show     |            | Show the headerPullView |
| hide     |            | Hide the headerPullView |
| init     | `object`   | Initialize the widget (called automatically if you pass `table` and `loader` as arguments to `createWidget`) | 
| remove   |            | Undo the init |

## Changelog
* 1.2
  * Retina arrow images, including new (default) grey one
  * Removed text showing last update for more clear view
  * Easier styling
* 1.1 / 1.1.1
  * Exposed new API functions to show/hide the view, set the date and trigger the widget manually.
  * Renamed 'load' parameter to 'loader' in line with upcomming widgets.
* 1.0
  * Initial version