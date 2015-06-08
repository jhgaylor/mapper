GeoLog = new Mongo.Collection("geo_log");
Router.map(function() {
  this.route('statefarm', {
    template: "statefarm",
    path: "/"
  });
});

Meteor.methods({
  writeGeo: function (requestData) {
    // Can insert into a Collection from the server (or whatever)
    return !! GeoLog.insert(requestData)
  }
});
