var args = arguments[0] || {};

var options = _.defaults(args, {
	msgPull: 'Pull down to refresh...',
	msgRelease: 'Release to refresh...',
	msgUpdating: 'Updating...',
	msgUpdated: 'Last Updated: %s %s'
});

var pulling = false;
var reloading = false;
var offset = 0;

function doReset() {
    reloading = false;
    var date = new Date();
    $.updated.text = String.format(options.msgUpdated, String.formatDate(date, 'short'), String.formatTime(date, 'short'));
    $.activityIndicator.hide();
    $.arrow.transform=Ti.UI.create2DMatrix();
    $.arrow.show();
    $.status.text = options.msgPull;
    args.table.setContentInsets({top:0}, {animated:true});
}

args.table.setHeaderPullView($.headerPullView);
 
args.table.addEventListener('scroll',function(e){
    offset = e.contentOffset.y;
    if (pulling && !reloading && offset > -80 && offset < 0){
        pulling = false;
        var unrotate = Ti.UI.create2DMatrix();
        $.arrow.animate({transform:unrotate, duration:180});
        $.status.text = options.msgPull;
    } else if (!pulling && !reloading && offset < -80){
        pulling = true;
        var rotate = Ti.UI.create2DMatrix().rotate(180);
        $.arrow.animate({transform:rotate, duration:180});
        $.status.text = options.msgRelease;
    }
});
 
args.table.addEventListener('dragEnd', function (e){
    if (pulling && !reloading && offset < -80){
        pulling = false;
        reloading = true;
        $.status.text = options.msgUpdating;
        $.arrow.hide();
        $.activityIndicator.show();
        e.source.setContentInsets({top:80}, {animated:true});
        args.load();
    }
});

exports.reset = doReset;