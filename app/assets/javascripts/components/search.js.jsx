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

        <div className="search-inputs">
          <label htmlFor='min_seating'>
            Min. seating:
            <input
              type='integer'
              id='min_seating'
              onChange={this._updateFilter}
              value={this.state.searchParams.minSeating}/>
          </label>

          <label htmlFor='max_seating'>
            Max. seating:
            <input
              type='integer'
              id='max_seating'
              onChange={this._updateFilter}
              value={this.state.searchParams.minSeating} />
          </label>
        </div>

        <Map clickMapHandler={this.clickMapHandler}/>
        <Index />
      </div>
    );
  },

  _updateSearchParams: function () {
    this.setState({searchParams: FilterParamsStore.filterParams()});
  },

  _fetchFilteredBenches: function () {
    debugger
    ApiUtil.fetchBenches(this.state.searchParams);
  },

  _updateFilter: function (e) {
    debugger
    var val = parseInt(e.currentTarget.value);
    switch(e.currentTarget.id) {
      case "min_seating":
        FilterActions.receiveFilterParams({minSeating: val});
        break
      case "max_seating":
        FilterActions.receiveFilterParams({maxSeating: val});
        break
    }


  }
})
