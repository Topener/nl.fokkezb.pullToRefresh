# PullToRefresh Widget
## Overview
The *PullToRefresh* widget implements the [TableView Refresh with headerPullView](http://docs.appcelerator.com/titanium/latest/#!/guide/TableView_Refresh_with_headerPullView) for [Titanium](http://www.appcelerator.com/platform) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) by [Appcelerator](http://www.appcelerator.com).

## Features
* Initialize the widget through one simple call.
* Change (localize) any of the messages displayed.
* Localized date and time of last update.

## Future work
* Direct localization calls from within the widget.
* Callback to check if the widget is allowed to do reload.

## Quick Start
* Download the repository of the [widget as a ZIP file](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh/archive/master.zip).
* Move the file to your project's root folder.
* Unzip the file and you'll find the widget under `app/widgets/nl.fokkezb.pullToRefresh`.
* Add the widget as a dependency to your `app/config.json` file like so:

```javascript
	…
	"dependencies": {
		"nl.fokkezb.pullToRefresh":"1.0"
	}
```

* Attach the widget to any *Ti.UI.TableView* like so:

```javascript
var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh', null, {
	table: $.myTable,
	load: myLoadCallback
});
```

* In your *myLoadCallback* notify the widget when you're done loading:

```javascript
…
ptrCtrl.reset();
```


## Additonal parameters
The only required parameters are the `table` and `load` parameters. You can change the displayed texts using the following additional ones:

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| msgPull | *string* | Pull down to refresh... |
| msgRelease | *string*  | Release to refresh... |
| msgUpdating | *string* | Updating... |
| msgUpdated | *string* | Last Updated: %s %s |