window.BenchForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  blankAttrs: {
    lat: '',
    lng: '',
    description: '',
    seating: ''
  },

  getInitialState: function () {
    debugger
    var coords = this.props.location.query;
    this.attrs = this.blankAttrs;
    this.attrs.lat = coords.lat;
    this.attrs.lng = coords.lng;
    return this.attrs;
  },

  createBench: function (event) {
    event.preventDefault();
    var bench = {};
    Object.keys(this.state).forEach(function (key) {
      bench[key] = this.state[key];
    }.bind(this))
    ApiUtil.createBench(bench, function (bench) {
      debugger
      var attrs = { lat: bench.lat, lng: bench.lng };
      this.history.pushState(null, "/", attrs);
    }.bind(this));
  },

  render: function () {

    return (
      <form className='new-bench' onSubmit={this.createBench}>
        <div>
          <label htmlFor='bench_description'>Description:</label>
          <input
            type='text'
            id='bench_description'
            valueLink={this.linkState("description")}
          />
        </div>

        <div>
          <label htmlFor='bench_image_url'>Image URL:</label>
          <input
            type='text'
            id='bench_image_url'
            valueLink={this.linkState("image_url")}
          />
        </div>

        <div>
          <label htmlFor='bench_seating'>Seating:</label>
          <input
            type='float'
            id='bench_seating'
            valueLink={this.linkState("seating")}
          />
        </div>

        <div>
          <label htmlFor='bench_lat'>Lat:</label>
          <input
            type='float'
            id='bench_lat'
            valueLink={this.linkState("lat")}
          />
        </div>

        <div>
          <label htmlFor='bench_lng'>Lng:</label>
          <input
            type='float'
            id='bench_lng'
            valueLink={this.linkState("lng")}
          />
        </div>

        <button>Create Bench</button>
        <br />
      </form>
    );
  }
});
