Meteor.startup(function() {
  GoogleMaps.load({libraries: 'geometry'});
});

Template.statefarm.onCreated(function() {
this.subscribe("basic");
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('stateFarmMap', function(map) {
    // Add a marker to the map once it's ready
    // var marker = new google.maps.Marker({
    //   position: map.options.center,
    //   map: map.instance
    // });
  	var points = GeoLog.find().map(function (a) {
  		return new google.maps.LatLng(a.latitude, a.longitude);
  	})
	var flightPath = new google.maps.Polyline({
		path: points,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
		// map: map
	});

	flightPath.setMap(map.instance);
  });
});

Template.statefarm.helpers({
	things: function () {
		return GeoLog.find()
	},
	mapOptions: function () {
		// Make sure the maps API has loaded
	    if (GoogleMaps.loaded()) {
	      // Map initialization options
	      return {
	        zoom: 3,
		    center: new google.maps.LatLng(0, -180),
		    mapTypeId: google.maps.MapTypeId.TERRAIN
	      };
	    }
	}
});

Template.statefarm.events({
	'click #getBackground': function(event) {
        var btn = event.currentTarget;
        var dest = document.getElementById('btnFeedback');
        if (!Meteor.isCordova) {
          dest.innerHTML = 'Not Available, Not Cordova';
          return;
        }
        if (!GeolocationBG2.isStarted) {
          if (!GeolocationBG2.start()) {
            dest.innerHTML = 'ERROR: Not Started, unable to start';
            return;
          }
          if (!GeolocationBG2.isStarted) {
            dest.innerHTML = 'ERROR: Not Started, status = false';
            return;
          }
          dest.innerHTML = 'Started (every few minutes there should be an update)';
          btn.innerHTML = 'Stop';
          return;
        }
        if (!GeolocationBG2.stop()) {
          dest.innerHTML = 'ERROR: Not Stopped, unable to stop';
          return;
        }
        if (GeolocationBG2.isStarted) {
          dest.innerHTML = 'ERROR: Not Stopped, status = true';
          return;
        }
        dest.innerHTML = 'Stopped';
        btn.innerHTML = 'Start';
        return;
      },
})
