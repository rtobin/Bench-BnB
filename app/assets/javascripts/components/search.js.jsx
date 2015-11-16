window.Search = React.createClass({
  getInitialState: function () {
    return {
      searchParams: FilterParamsStore.filterParams()
    };
  },

  componentDidMount: function () {
    FilterParamsStore.addSearchChangeListener(this._updateSearchParams);
  },


  render: function () {
    return (
      <div>
        <FilterBenches />
        <Map clickMapHandler={this.clickMapHandler}/>
        <Index />
      </div>
    );
  },

  _updateSearchParams: function () {
    this.setState({searchParams: FilterParamsStore.filterParams()});
    this._fetchFilteredBenches();
  },

  _fetchFilteredBenches: function () {
    ApiUtil.fetchBenches(this.state.searchParams);
  },

})
