window.FilterBenches = React.createClass({

  render: function () {
    return (
      <div className="search-inputs">
        <label htmlFor='min_seating'>
          Min. seating:
          <input
            type='integer'
            id='min_seating'
            onChange={this._updateFilter}/>
        </label>

        <label htmlFor='max_seating'>
          Max. seating:
          <input
            type='integer'
            id='max_seating'
            onChange={this._updateFilter}/>
        </label>
      </div>
    );
  },

  _updateFilter: function (e) {
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
