var refreshControl;
var list;

$.refresh = refresh;

$.hide = hide;
$.show = show;

$.getList = function() {
  return list;
};

(function constructor(args) {

  if (!OS_IOS && !OS_ANDROID) {
    console.warn('[pullToRefresh] only supports iOS and Android.');
    return;
  }

  if (!_.isArray(args.children) || !_.contains(['Ti.UI.ListView', 'Ti.UI.TableView', 'de.marcelpociot.CollectionView'], args.children[args.children.length-1].apiName)) {
    console.error('[pullToRefresh] is missing required Ti.UI.ListView or Ti.UI.TableView or de.marcelpociot.CollectionView as first child element.');
    return;
  }

  list = _.last(args.children);
  delete args.children;

  _.extend($, args);

  if (OS_IOS) {
    refreshControl = Ti.UI.createRefreshControl();
    refreshControl.addEventListener('refreshstart', onRefreshstart);

    if (args.title) {
      setTitle(args.title);
    }

    list.refreshControl = refreshControl;

    $.addTopLevelView(list);

  } else if (OS_ANDROID) {
    refreshControl = require('com.rkam.swiperefreshlayout').createSwipeRefresh({
      view: list
    });

    refreshControl.addEventListener('refreshing', onRefreshstart);

    $.addTopLevelView(refreshControl);
  }

})(arguments[0] || {});

function refresh() {
  show();

  onRefreshstart();
}

function hide() {

  if (OS_IOS) {
    refreshControl.endRefreshing();

  } else if (OS_ANDROID) {
    refreshControl.setRefreshing(false);
  }
}
exports.hide = hide;

function show() {

  if (OS_IOS) {
    refreshControl.beginRefreshing();

  } else if (OS_ANDROID) {
    refreshControl.setRefreshing(true);
  }
}
exports.show = show;

function setTitle(text){

  if (OS_IOS) {

  	if (text.apiName && text.apiName == 'Ti.UI.AttributedString'){
  		refreshTitle = text;

  	} else {
  		refreshTitle = Ti.UI.createAttributedString({
      		text: text
    		});
  	}

  	refreshControl.title = refreshTitle;
  }
}
exports.setTitle = setTitle;

function onRefreshstart() {

  $.trigger('release', {
    source: $,
    hide: hide
  });

}
