**NOTE:** As from Titanium 3.2.0, the native *UIRefreshControl* will be supported for iOS. The Android version of this widget may still be of use to you but personally I think a refresh button is more user-friendly then this implementation. Therefor I will not actively maintain this module any further.

---------------------

# Alloy *Pull to Refresh* Widget

## Overview
The *Pull to Refresh* widget implements the *Pull to Refresh* design pattern for the [Alloy](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Quick_Start) MVC framework for [Titanium](http://www.appcelerator.com/platform) by [Appcelerator](http://www.appcelerator.com). A Titanium Classic implementation can be found in the [documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/TableView_Refresh_with_headerPullView).

Also take a look at my [Infinite Scroll](https://github.com/FokkeZB/nl.fokkezb.infiniteScroll) widget.

## Overview
The widgets adds a *HeaderPullView* to a *TableView* that is shown when the users drags the view down when it is already scrolled to the top. An event is triggered so that the implementing controller can reload data.

![Extend edges](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/extend.png)

![Pull](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/pull.png)

![Release](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/release.png)

![Updating](https://raw.github.com/FokkeZB/nl.fokkezb.pullToRefresh/master/docs/updating.png)

## Features
* Add the widget to your *TableView* using just one line of code.
* Override all styling via your app's `app.tss`.
* Manually trigger the widget from your controller.
* Compatible with Android and other OS by using *HeaderView*

## Future work
* Support for *ListView*s.

## Quick Start
* Download the latest [release](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh/releases).
* Unzip the file to `app/widgets/nl.fokkezb.pullToRefresh`.
* Add the widget as a dependency to your `app/config.json` file:
	
	```javascript
		"dependencies": {
			"nl.fokkezb.pullToRefresh":"1.5.1"
		}
	```

* Add the widget to your *TableView*:

	```xml
	<Alloy>
	  <Collection src="myCollection" />
	  <TableView dataCollection="myCollection">
	    <Widget id="ptr" src="nl.fokkezb.pullToRefresh" onRelease="myLoader" />
	    <TableViewRow title="{myColumn}" />
	  </TableView>
	</Alloy>
	```
	
* In the callback set via `myLoader` make sure you call `e.hide()` to hide the *headerPullView* when it is done loading. For example: 

	```javascript
	function myLoader(e) {
		myCollection.fetch({			
			success: e.hide,
			error: e.hide
		});
	}
	```

## Styling
The widget can be fully styled without touching the widget source. Use the following ID's in your app's `app.tss` to override the default style:

| ID | Description |
| --------- | ------- |
| `#ptr` | The background of the *HeaderPullView* |
| `#ptrCenter` | Centers the contents, you probably only want to change `bottom` in conjuction with using the `height` parameter mentioned further on. |
| `#ptrArrow` | The arrow image. Use `WPATH('/images/white.png')` to use the white instead of the default grey image, or roll your own. |
| `#ptrIndicator` | The *ActivityIndicator* showing during load |
| `#ptrText` | The text |
| `#ptrLine` | The line separating the widget and the table |

## Internationalization
The widget texts can be overridden and translated via your `strings.xml` file, using the following names:

| Name        | Default |
| ----------- | ------- |
| msgPull     | Pull to refresh... |
| msgRelease  | Release to refresh... |
| msgUpdating | Updating... |

## Options
There are no required options to pass via TSS properties or XML attributes, apart from the `onRelease` attribute to bind your callback to the release-event.

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| msgPull | `string` | Overrides `Pull to refresh...` |
| msgRelease | `string`  | Overrides `Release to refresh...` |
| msgUpdating | `string` | Overrides `Updating...` |
| top **(iOS)**| `number` | If the top of the table is covered by another view - e.g. when using `Ti.UI.Window.extendEges` - set this to the height of that view (`64` for both status and navigation bar) |

## Methods
You can also manually show and hide the view or trigger the complete cycle of the widget. You could use this for the first load when your window opens.

| Function   | Parameters | Usage |
| ---------- | ---------- | ----- |
| setOptions | `object`   | Set any of the options |
| refresh    |            | Manually trigger pull + release |
| show       |            | Show the *headerPullView* |
| hide       |            | Hide the *headerPullView* |
| dettach    |            | Remove the *headerPullView* |
| attach     |            | Re-add the *headerPullView* after removal |
| init       | `Ti.UI.TableView` | Manually init the widget if it's the child element of the table, or to work around [TC-3417](https://jira.appcelerator.org/browse/TC-3417) in Alloy 1.3.0-cr.

## Changelog
* 1.5.1.
  * Workaround for regression in Alloy 1.3.0-cr
* 1.5
  * New `top` option for compatibility with `Ti.UI.Window.extendEdges` on iOS7
  * Arrow now properly hidden on Android, using opacity
  * Default style updated to match Twitter on iOS7
* 1.4
  * Now compatible with Android and other OS!
* 1.3
  * From now on declared in the XML view instead of the controller! 
  * Splitted `init` into `setOptions` and `attach`
  * Renamed `remove` to `dettach`
  * Renamed `trigger` to `refresh` to not interfere with BackBone
* 1.2
  * Retina arrow images, including new (default) grey one
  * Removed text showing last update for more clear view
  * Easier styling
* 1.1
  * Exposed new API functions to `show`/`hide` the view, set the `date` and `trigger` the widget manually.
  * Renamed `load` parameter to `loader` in line with upcomming widgets.
* 1.0
  * Initial version

## License

<pre>
Copyright 2013 Fokke Zandbergen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
