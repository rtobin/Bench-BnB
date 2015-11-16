(function (root) {

  var FILTER_CHANGE_EVENT = "filterChange";
  var _filterParams = {
    bounds: {},
    minSeating: null,
    maxSeating: null
  };

  updateParams = function (opts) {
    var opts = opts || {};
    _filterParams.bounds = opts.bounds || _filterParams.bounds;
    _filterParams.minSeating = opts.minSeating || _filterParams.minSeating;
    _filterParams.maxSeating = opts.maxSeating || _filterParams.maxSeating;
  };

  root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
    filterParams: function () {
      return _filterParams;
    },

    addSearchChangeListener: function (callback) {
      this.on(FILTER_CHANGE_EVENT, callback);
    },

    removeSearchChangeListener: function (callback) {
      this.removeListener(FILTER_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case BenchConstants.FILTER_PARAMS_RECEIVED:
          updateParams(payload.params);
          FilterParamsStore.emit(FILTER_CHANGE_EVENT);
          break;
      }
    })


  })
})(this);
