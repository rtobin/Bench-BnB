(function(root){
  var CHANGE_EVENT = "change";
  var CHANGE_MARKER_FOCUS = "marker_focus"
  var _benches = [];
  var _markers = [];

  var resetBenches = function(benches){
    _benches = benches;
  };

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      //return a shallow copy so consumer cannot mutate original
      return _benches.slice(0);
    },

    getAllBenchIds: function () {
      return _benches.map(function (bench) {return bench.id})
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addMarkerFocusListener :function (callback) {
      this.on(CHANGE_MARKER_FOCUS, callback);
    },

    removeMarkerFocuListener: function (callback) {
      this.removeListener(CHANGE_MARKER_FOCUS, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED):
          resetBenches(payload.benches);
          BenchStore.emit(CHANGE_EVENT);
          break;
        case BenchConstants.BENCH_IN_FOCUS:
          BenchStore.emit(CHANGE_MARKER_FOCUS);


      }
      if (payload.actionType === BenchConstants.BENCHES_RECEIVED) {

      }
    })



  });
})(this);
