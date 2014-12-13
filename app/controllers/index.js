$.ptrListView.refresh();
$.ptrTableView.refresh();

$.index.open();

function refresh(e) {

  populate(e.source.targetId);

  setTimeout(function afterTimeout() {

    e.hide();

  }, 500);

}

function populate(targetId) {

  var target = $[targetId];

  if (target.apiName === 'Ti.UI.TableView') {
    target.setData(_.map(_.range(0, 50), function onEach() {
      return {
        title: 'Random ' + _.random(1, 100)
      };
    }));

  } else {

    target.setItems(_.map(_.range(0, 50), function onEach() {
      return {
        properties: {
          title: 'Random ' + _.random(1, 100)
        }
      };
    }));
  }
}
