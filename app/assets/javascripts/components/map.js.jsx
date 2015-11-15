var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;


window.Map = React.createClass({

  componentDidMount: function(){
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };

    this.map = new google.maps.Map(map, mapOptions);
    this._markers = [];
    this._bouncingMarker = null;
    this.map.addListener("idle", this._fetchBenchesInBound);

    BenchStore.addChangeListener(this._setBenchMarkers);
    BenchHoverStore.addHoverChangeListener(this._onBenchHoverChange);
  },


  componentWillUnmount: function () {
    BenchStore.removeChangeListener(this._onChange);
    BenchHoverStore.removeHoverChangeListener(this._onBenchHoverChange.bind(this));
  },

  render: function () {
   return (
     <div className="map" ref="map" />
   );
  },

  _fetchBenchesInBound: function () {
    var bounds = this.map.getBounds();
    neBounds = bounds.getNorthEast();
    swBounds = bounds.getSouthWest();

    ApiUtil.fetchBenches({
      northEast: {lat: neBounds.lat(), lng: neBounds.lng()},
      southWest: {lat: swBounds.lat(), lng: swBounds.lng()}
    })
  },

  _setBenchMarkers: function () {
    labelIndex = 0;
    var newMarkerSet = BenchStore.all().map(this._addBenchMarker);
    this._resetMarkers(newMarkerSet);
  },

  _resetMarkers: function (newMarkers) {
    this._markers.forEach( function (marker) {
      if (newMarkers.indexOf(marker) === -1) {
        marker.setMap(null);
      }
    })

    this._markers = newMarkers;
  },

  _addBenchMarker: function (benchPlace, markerIdx) {
    var marker, pos;
    marker = this._getBenchMarker(benchPlace.id);

    if (marker == null) {
      pos = {lat: benchPlace.lat, lng: benchPlace.lng};
      marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: benchPlace.name,
        animation: google.maps.Animation.DROP,
        label: labels[markerIdx % labels.length]
      });

      this._attachSecretMessage(marker, benchPlace.description);
      marker["benchId"] = benchPlace.id;
    }

    return marker;
  },

  _getBenchMarker: function (id) {
    for (var i = 0; i < this._markers.length; i++) {
      if (this._markers[i].benchId === id) {
        return this._markers[i];
      }
    }

    return null;
  },

  _onBenchHoverChange: function () {
    var markerIdx = BenchHoverStore.benchIndex();

    if (this._bouncingMarker) {
      this._toggleBouncing(this._bouncingMarker);
    }

    if (markerIdx !== -1) {
      this._bouncingMarker = this._markers[markerIdx];
      this._toggleBouncing(this._bouncingMarker);

    } else {
      this._bouncingMarker = null;
    }
  },

  _toggleBouncing: function (marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  },

  _attachSecretMessage: function (marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: "Here is " + secretMessage + "!"
    });

    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
  }
})
