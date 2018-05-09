//Function for proximity to questions, parsing the app_array.
function proximity(){
  qProximity(app_array);
}

function qProximity(any_array) {
  myPos=current_position.getLatLng();
for (var i=0; i<any_array.length;i++) {
  qPos=any_array[i].getLatLng();
  var proximity = getDistanceFromLatLonInM(qPos.lat,qPos.lng,myPos.lat,myPos.lng);
  if (proximity <= 40) {
    any_array[i].setIcon(testMarkerGreen);
  } else {
    any_array[i].setIcon(testMarkerRed).bindPopup("Your Not Close Enough Yet");
  }
}
}

//Adapted from: Calculate distance between two latitude-longitude points? (Haversine formula). (2008). Retrieved from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula#
function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = (R * c)*1000; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

