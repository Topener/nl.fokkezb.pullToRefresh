var args = arguments[0] || {};

var options = null;

var initted = false;
var pulling = false;
var pulled = false;
var loading = false;

var offset = 0;

function doShow(msg) {

	if (!initted || pulled) {
		return false;
	}

	pulled = true;

	$.ptrText.text = msg || options.msgUpdating;
	$.ptrArrow.hide();
	$.ptrIndicator.show();

	options.table.setContentInsets({
		top : options.height
	}, {
		animated : true
	});

	return true;
}

function doHide() {

	if (!initted || !pulled) {
		return false;
	}

	options.table.setContentInsets({
		top : 0
	}, {
		animated : true
	});

	$.ptrIndicator.hide();
	$.ptrArrow.transform = Ti.UI.create2DMatrix();
	$.ptrArrow.show();
	$.ptrText.text = options.msgPull;

	pulled = false;
}

function doTrigger() {

	if (!initted || loading) {
		return false;
	}

	loading = true;

	doShow();

	options.loader(finishLoading);
}

function finishLoading() {
	doHide();

	loading = false;
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

		doTrigger();
	}
}

function doInit(args) {

	if (initted || !OS_IOS) {
		return false;
	}

	initted = true;

	options = _.defaults(args, {
		msgPull : L('ptrPull', 'Pull to refresh...'),
		msgRelease : L('ptrRelease', 'Release to refresh...'),
		msgUpdating : L('ptrUpating', 'Updating...'),
		height : 50
	});

	$.ptrText.text = options.msgPull;

	options.table.setHeaderPullView($.ptr);

	options.table.addEventListener('scroll', scrollListener);
	options.table.addEventListener('dragEnd', dragEndListener);
}

function doRemove() {

	if (!initted) {
		return false;
	}

	options.table.setHeaderPullView(null);

	options.table.removeEventListener('scroll', scrollListener);
	options.table.removeEventListener('dragEnd', dragEndListener);

	options = null;

	initted = false;
	pulling = false;
	loading = false;
	shown = false;

	offset = 0;
}

if (args.table && args.loader) {
	doInit(args);
}

exports.init = doInit;
exports.show = doShow;
exports.hide = doHide;
exports.trigger = doTrigger;
exports.remove = doRemove;