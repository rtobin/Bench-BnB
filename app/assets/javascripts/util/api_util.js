window.ApiUtil = {
  fetchBenches: function (bounds) {
    //make an api call using AJAX in here
    $.ajax({
      url: "api/benches",
      dataType: "json",
      data: {bounds: bounds},
      success: function (benches){
        ApiActions.receiveAllBenches(benches);
      }
    })
  },

  createBench: function (bench, callback) {
    $.ajax({
      url: "api/benches",
      method: "POST",
      data: {bench: bench},
      success: function (bench) {
        ApiActions.receiveSingleBench(bench);
        callback && callback(bench);
      }
    })
  }
}
