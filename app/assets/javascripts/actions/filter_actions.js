FilterActions = {
  receiveFilterParams: function (params) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.FILTER_PARAMS_RECEIVED,
      params: params
    });
  },
}
