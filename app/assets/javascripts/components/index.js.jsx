window.Index = React.createClass({
  getInitialState: function () {
    return { benches: BenchStore.all() }
  },

  _onChange: function () {
    this.setState({ benches: BenchStore.all() });
  },

  componentDidMount: function () {
    BenchStore.addChangeListener(this._onChange);

  },

  compomentWillUnmount: function () {
    BenchStore.removeChangeListener(this._onChange);
  },


  getBenchList: function () {

    return this.state.benches.map( function (bench) {
      return <li>{bench.description}</li>
    })
  },

  render: function () {
    return(
      <div>
        <div className="benches-index">
          <ul classname="list">
            {
              this.state.benches.map( function (bench) {
                return <li>{bench.description}</li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
});
