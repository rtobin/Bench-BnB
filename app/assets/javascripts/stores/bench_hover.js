(function (root) {
  var BENCH_HOVER_CHANGE_EVENT = "benchHoverChange";
  var _benchIndex;

  var hoverOnBench = function (idx) {
    _benchIndex = idx;
  };

  var hoverOffBench = function () {
    _benchIndex = -1;
  };

  root.BenchHoverStore = $.extend({},  EventEmitter.prototype, {
    benchIndex: function () {
      return _benchIndex;
    },

    addHoverChangeListener: function (callback) {
      this.on(BENCH_HOVER_CHANGE_EVENT, callback);
    },

    removeHoverChangeListener: function (callback) {
      this.removeListener(BENCH_HOVER_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case BenchConstants.BENCH_HOVERED_ON:
          hoverOnBench(payload.idx);
          console.log("hover: " + payload.idx)
          BenchHoverStore.emit(BENCH_HOVER_CHANGE_EVENT);
          break;
        case BenchConstants.BENCH_HOVERED_OFF:
          hoverOffBench();
          BenchHoverStore.emit(BENCH_HOVER_CHANGE_EVENT);
          break;
      }
    })
  });
})(this);
