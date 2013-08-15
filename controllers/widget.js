var args = arguments[0] || {};

var options = {
	msgPull: L('ptrPull', 'Pull to refresh...'),
	msgRelease: L('ptrRelease', 'Release to refresh...'),
	msgUpdating: L('ptrUpating', 'Updating...')
};

var height = 50,
	attached = false,
	pulling = false,
	pulled = false,
	loading = false,
	offset = 0;

// delete special args
delete args.__parentSymbol;
delete args.__itemTemplate;
delete args.$model;

// set args as options
setOptions(args);

init();

function show(msg) {

	if (!attached || pulled) {
		return false;
	}

	pulled = true;

	$.view.ptrText.text = msg || options.msgUpdating;
	$.view.ptrArrow.hide();
	$.view.ptrIndicator.show();

	if (OS_IOS) {

		__parentSymbol.setContentInsets({
			top: height
		}, {
			animated: true
		});

	} else {
		__parentSymbol.animate({
			top: 0
		});
	}

	return true;
}

function hide() {

	if (!attached || !pulled) {
		return false;
	}

	$.view.ptrIndicator.hide();
	$.view.ptrArrow.transform = Ti.UI.create2DMatrix();
	$.view.ptrArrow.show();
	$.view.ptrText.text = options.msgPull;

	if (OS_IOS) {

		__parentSymbol.setContentInsets({
			top: 0
		}, {
			animated: true
		});

	} else {
		__parentSymbol.animate({
			top: -height
		});
	}

	pulled = false;
	loading = false;

	return true;
}

function refresh() {

	if (!attached || loading) {
		return false;
	}

	loading = true;

	show();

	$.trigger('release', {
		hide: hide
	});

	return true;
}

function scrollListener(e) {

	if (OS_IOS) {

		if (pulled) {
			return;
		}

		offset = e.contentOffset.y;

		if (pulling && !loading && offset > -height && offset < 0) {
			pulling = false;
			var unrotate = Ti.UI.create2DMatrix();
			$.view.ptrArrow.animate({
				transform: unrotate,
				duration: 180
			});
			$.view.ptrText.text = options.msgPull;

		} else if (!pulling && !loading && offset < -height) {
			pulling = true;
			var rotate = Ti.UI.create2DMatrix().rotate(180);
			$.view.ptrArrow.animate({
				transform: rotate,
				duration: 180
			});
			$.view.ptrText.text = options.msgRelease;
		}

	} else {
		offset = e.firstVisibleItem;
	}

	return;
}

function dragEndListener(e) {

	if (!pulled && pulling && !loading && offset < -height) {
		pulling = false;

		refresh();
	}

	return;
}

function swipeListener(e) {

	if (offset === 0 && e.direction === 'down') {
		refresh();
	}

	return;
}

function setOptions(_properties) {
	_.extend(options, _properties);

	return;
}

function attach() {

	if (attached) {
		return false;
	}

	if (OS_IOS) {
		__parentSymbol.headerPullView = $.view.ptr;
	}

	init();

	return true;
}

function init() {
	__parentSymbol.addEventListener('scroll', scrollListener);

	height = $.view.ptr.height;
	attached = true;
	pulling = false;
	pulled = false;
	loading = false;

	offset = 0;

	if (OS_IOS) {
		__parentSymbol.addEventListener('dragEnd', dragEndListener);

	} else {
		__parentSymbol.top = -height;

		__parentSymbol.addEventListener('swipe', swipeListener);
	}

	$.view.ptrText.text = options.msgPull;

	return;
}

function dettach() {

	if (!attached) {
		return false;
	}

	__parentSymbol.removeEventListener('scroll', scrollListener);

	if (OS_IOS) {
		__parentSymbol.removeEventListener('dragEnd', dragEndListener);

		__parentSymbol.headerPullView = null;

	} else {
		__parentSymbol.removeEventListener('swipe', swipeListener);

		hide();
	}

	attached = false;

	return true;
}

exports.setOptions = setOptions;
exports.show = show;
exports.hide = hide;
exports.refresh = refresh;
exports.dettach = dettach;
exports.attach = attach;