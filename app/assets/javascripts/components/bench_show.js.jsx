window.BenchShow = React.createClass({
  getInitialState: function () {
    return {
      bench: BenchStore.findById(this.props.params.id)
    };
  },

  componentDidMount: function () {
    // from the path `/benches/:id`
    this.benchId = this.props.params.id

    // this.setState({ bench: BenchStore.findById })
    this.bench = BenchStore.findById(id);
  },

  render: function () {
    debugger
    return (
      <div>
        <h3>{this.state.bench.description}</h3>
        <p>seating available: {this.state.bench.seating}</p>
      </div>
    )
  }
});
