var args = arguments[0] || {};

var options = {
	msgPull : L('ptrPull', 'Pull to refresh...'),
	msgRelease : L('ptrRelease', 'Release to refresh...'),
	msgUpdating : L('ptrUpating', 'Updating...'),
	height : 50
};

var attached = false;
var pulling = false;
var pulled = false;
var loading = false;

var offset = 0;

function show(msg) {

	if (!attached || pulled) {
		return false;
	}

	pulled = true;

	$.ptrText.text = msg || options.msgUpdating;
	$.ptrArrow.hide();
	$.ptrIndicator.show();

	__parentSymbol.setContentInsets({
		top : options.height
	}, {
		animated : true
	});

	return true;
}

function hide() {

	if (!attached || !pulled) {
		return false;
	}

	__parentSymbol.setContentInsets({
		top : 0
	}, {
		animated : true
	});

	$.ptrIndicator.hide();
	$.ptrArrow.transform = Ti.UI.create2DMatrix();
	$.ptrArrow.show();
	$.ptrText.text = options.msgPull;

	pulled = false;
	loading = false;
}

function refresh() {

	if (!attached || loading) {
		return false;
	}

	loading = true;

	show();

	$.trigger('release');
}

function scrollListener(e) {
	offset = e.contentOffset.y;

	if (pulled) {
		return;
	}

	if (pulling && !loading && offset > -options.height && offset < 0) {
		pulling = false;
		var unrotate = Ti.UI.create2DMatrix();
		$.ptrArrow.animate({
			transform : unrotate,
			duration : 180
		});
		$.ptrText.text = options.msgPull;

	} else if (!pulling && !loading && offset < -options.height) {
		pulling = true;
		var rotate = Ti.UI.create2DMatrix().rotate(180);
		$.ptrArrow.animate({
			transform : rotate,
			duration : 180
		});
		$.ptrText.text = options.msgRelease;
	}
}

function dragEndListener(e) {

	if (!pulled && pulling && !loading && offset < -options.height) {
		pulling = false;

		refresh();
	}
}

function setOptions(_properties) {
	_.extend(options, _properties);
}

function attach(setHeaderPullView) {
	
	if (attached) {
		return;
	}
	
	// Already done on first call
	if (setHeaderPullView !== false) {
		__parentSymbol.headerPullView = $.ptr;	
	}
	
	__parentSymbol.addEventListener('scroll', scrollListener);
	__parentSymbol.addEventListener('dragEnd', dragEndListener);
	
	attached = true;
	pulling = false;
	loading = false;
	shown = false;
	
	offset = 0;
}

function dettach() {

	if (!attached) {
		return;
	}

	__parentSymbol.headerPullView = null;

	__parentSymbol.removeEventListener('scroll', scrollListener);
	__parentSymbol.removeEventListener('dragEnd', dragEndListener);

	attached = false;
}

delete args.__parentSymbol;

setOptions(args);

attach(false);

exports.setOptions = setOptions;
exports.show = show;
exports.hide = hide;
exports.refresh = refresh;
exports.dettach = dettach;
exports.attach = attach;