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
			"nl.fokkezb.pullToRefresh":"1.3"
		}
	```

* Add the widget to your TableView:

	```xml
	<TableView>
	  <Widget id="ptr" src="nl.fokkezb.pullToRefresh" onRelease="myLoader" />
	</TableView>
	```
	
* In the callback set via `myLoader` make sure you call `$.ptr.hide()` to hide the headerPullView when it is done loading.
	
## Styling
The widget can be fully styled without touching the widget source. Use the following ID's in your app's `app.tss` to override the default style:

| ID | Description |
| --------- | ------- |
| `#ptr` | The background of the headerPullView |
| `#ptrCenter` | Centers the contents, you probably only want to change `bottom` in conjuction with using the `height` parameter mentioned further on. |
| `#ptrArrow` | The arrow image. Use `WPATH('/images/white.png')` to use the white instead of the default grey image, or roll your own. |
| `#ptrIndicator` | The activityIndicator showing during load |
| `#ptrText` | The text |

## Internationalization
The widget texts can be overridden and translated via your `strings.xml` file, using the following names:

| Name        | Default |
| ----------- | ------- |
| msgPull     | Pull to refresh... |
| msgRelease  | Release to refresh... |
| msgUpdating | Updating... |

## Options
There are no required options to pass via TSS properties or XML attributes, apart from the `onRelase` attribute to bind your callback to the release-event.

If you re-style the widget you might need to change the `height` of the headerPullView to keep during load. And instead of using a `strings.xml` file you can also override the default texts using the following parameters:

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| height | `number` | Height of the headerPullView during load (default: `50`) |
| msgPull | `string` | Overrides `Pull to refresh...` |
| msgRelease | `string`  | Overrides `Release to refresh...` |
| msgUpdating | `string` | Overrides `Updating...` |

## Methods
You can also manually show and hide the view or trigger the complete cycle of the widget. You could use this for the first load when your window opens.

| Function   | Parameters | Usage
| ---------- | ---------- |
| refresh    |            | Manually trigger pull + release 
| show       |            | Show the headerPullView
| hide       |            | Hide the headerPullView
| setOptions | `object`   | Set any of the options
| dettach    |            | Remove the headerPullView
| attach     |            | Re-add the headerPullView after removal

## Changelog
* 1.3
  * From now on declared in the XML view instead of the controller! 
  * Splitted `init` into `setOptions` and `attach`
  * Renamed `remove` to `dettach`
  * Renamed `trigger` to `refresh` to not interfere with BackBone
* 1.2
  * Retina arrow images, including new (default) grey one
  * Removed text showing last update for more clear view
  * Easier styling
* 1.1 / 1.1.1
  * Exposed new API functions to `show`/`hide` the view, set the `date` and `trigger` the widget manually.
  * Renamed `load` parameter to `loader` in line with upcomming widgets.
* 1.0
  * Initial version
