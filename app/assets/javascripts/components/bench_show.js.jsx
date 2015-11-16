window.BenchShow = React.createClass({
  componentDidMount() {
    // from the path `/benches/:id`
    var id = parseInt(this.props.params.id);

    this.setState({ bench: BenchStore.findById(id) });
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
