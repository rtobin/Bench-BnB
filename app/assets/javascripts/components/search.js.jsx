window.Search = React.createClass({

  clickMapHandler: function (coords) {
    debugger
    coords = {
      lat: coords.lat(),
      lng: coords.lng()
    };
    this.props.history.pushState(null, "/benches/new", coords);
    // this.props.history.go();
  },

  render: function () {
    return (
      <div>
        <Map clickMapHandler={this.clickMapHandler}/>
        <Index />
      </div>
    );
  }
})
