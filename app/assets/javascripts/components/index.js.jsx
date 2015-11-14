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
      <div className="benches-index">
        <ul className="list">
          {
            this.state.benches.map( function (bench) {
              return <li key={bench.id}>{bench.description}</li>
            })
          }
        </ul>
      </div>
    );
  }
});
