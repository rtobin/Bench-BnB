window.Index = React.createClass({
  getInitialstate: function () {
    return { benches: Benchstore.all() }
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


  render: function () {
    return(
      <div>
        <div className="benches-index">
        </div>
      </div>
    );
  }
});
