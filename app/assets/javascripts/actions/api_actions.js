ApiActions = {
  receiveAll: function (benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  markerFocus: function (bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_IN_FOCUS,
      bench: bench
    });
  }
}
