var Link = ReactRouter.Link;

window.Index = React.createClass({
  getInitialState: function () {
    return { benches: BenchStore.all() }
  },

  componentDidMount: function () {
    BenchStore.addChangeListener(this._onChange);

  },

  compomentWillUnmount: function () {
    BenchStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var that = this;
    return(
      <ul className="benches-index">
        {
          this.state.benches.map( function (bench, idx) {
            return (
              <li key={bench.id}
                onMouseEnter={ApiActions.hoverOn.bind(null, idx)}
                onMouseLeave={ApiActions.hoverOff.bind(null, idx)}>
                <Link to={"/benches/" + bench.id}>{bench.description}</Link>
              </li>
            )
          })
        }
      </ul>
    );
  },

  _onChange: function () {
    this.setState({benches: BenchStore.all()});
  }
});
