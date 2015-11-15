ApiActions = {
  receiveAllBenches: function (benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  receiveSingleBench: function(bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      bench: bench
    });
  },

  hoverOn: function(idx) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_HOVERED_ON,
      idx: idx
    });
  },

  hoverOff: function(idx) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_HOVERED_OFF,
      idx: idx
    });
  }
}
