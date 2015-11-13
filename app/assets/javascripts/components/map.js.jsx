var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;


window.Map = React.createClass({
  getInitialstate: function () {
    return {
      _markers: [],
    }
  },

  componentDidMount: function(){
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };

    // this.setState({map: new google.maps.Map(map, mapOptions)});
    this.map = new google.maps.Map(map, mapOptions);
    this.listenForIdle();
    this.setBenchMarkers();
    BenchStore.addChangeListener(this.setBenchMarkers);
    // this.props.benches.forEach(this.addBench);
  },

  setBenchMarkers: function () {
    labelIndex = 0;
    var newMarkers = BenchStore.all().map(this.addBenchMarker)
    if (this._markers) {
      this.removeBenchMarkersNotStored();
      this._markers = this._markers.concat(newMarkers);
    } else {
      this._markers = newMarkers;
    }
    // this.setState({_markers: this.state._markers.concat(newMarkers)});

    console.log(newMarkers);


    // BenchStore.all().forEach(function(bench){console.log(bench.description)});
  },

  removeBenchMarkersNotStored: function () {
    var benchIds = BenchStore.getAllBenchIds();
    var that = this;
    this._markers.forEach( function (marker) {
      if (benchIds.indexOf(marker.benchId) === -1) {
        that.removeMarkerFromMap(marker);
      }
    })
  },

  removeMarkerFromMap: function (marker) {
    marker.setMap(null);
    var idx = this._markers.indexOf(marker);
    this._markers.splice(idx, 1);
  },

  benchHasMarker: function (id) {
    for (var i = 0; i < this._markers.length; i++) {
      if (this._markers[i].benchId === id) {
        return this._markers[i];
      }
    }

    return undefined;
  },

  listenForIdle: function () {
    //we listen for the map to emit an 'idle' event, it does this when
    //the map stops moving
    var that = this;
    google.maps.event.addListener(this.map, 'idle', function() {
      var bounds = this.getBounds();
      neBounds = bounds.getNorthEast();
      swBounds = bounds.getSouthWest();
      bounds = {
        northEast: {lat: neBounds.lat(), lng: neBounds.lng()},
        southWest: {lat: swBounds.lat(), lng: swBounds.lng()}
      }
       ApiUtil.fetchBenches(bounds)
    });

  },

  addBenchMarker: function (benchPlace, idx) {
    var marker, pos;
    marker = this.benchHasMarker(benchPlace.id);
    if (marker == undefined) {
      setTimeout( function () {
          pos = {lat: benchPlace.lat, lng: benchPlace.lng};
          marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            label: labels[labelIndex++ % labels.length],
            title: benchPlace.name,
            animation: google.maps.Animation.DROP
          });

          marker.addListener('click', this.toggleBounce);
          this.attachSecretMessage(marker, benchPlace.description);
          marker["benchId"] = benchPlace.id;
        }.bind(this),

        idx * 200
      )

    }

    return marker;
  },

  toggleBounce: function (marker) {
    // if (marker.getAnimation() !== null) {
    //   marker.setAnimation(null);
    // } else {
    console.log(marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
    // }
  },

  attachSecretMessage: function (marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: "Here is " + secretMessage + "!"
    });

    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
  },


  render: function () {
    return (
      <div className="map" ref="map">

      </div>
    );
  }

})
