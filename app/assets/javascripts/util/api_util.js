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
  }
}
