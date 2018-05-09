        //Defining a list of basemaps from mapbox studio api: 
    var northstar = L.tileLayer('https://api.mapbox.com/styles/v1/rjhargreaves/cjcv3d22i04bp2rpza7tjx1c4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmpoYXJncmVhdmVzIiwiYSI6ImNpa3JmbDJiazAwMDF3Y20xMHoyaXowdDAifQ.78vWSemMDwn42TwMuxfODw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' 
      + 
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    
    }),

    scenic   = L.tileLayer('https://api.mapbox.com/styles/v1/rjhargreaves/cjgxxe0ra003t2rnrkjvu8ofs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmpoYXJncmVhdmVzIiwiYSI6ImNpa3JmbDJiazAwMDF3Y20xMHoyaXowdDAifQ.78vWSemMDwn42TwMuxfODw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' 
      + 
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    
    });

    satellite   = L.tileLayer('https://api.mapbox.com/styles/v1/rjhargreaves/cjgxztl85007j2ro5urdguxcg/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmpoYXJncmVhdmVzIiwiYSI6ImNpa3JmbDJiazAwMDF3Y20xMHoyaXowdDAifQ.78vWSemMDwn42TwMuxfODw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' 
      + 
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    
    });

    // Define mymap variable, with centre, zoom level and layers.
    var mymap = L.map('mapid',{
      center: [51.524428, -0.134224], 
      zoom: 13,
      layers: [satellite, scenic, northstar]
    });

    // Define baseMaps variable, for display within the layers navigation pane.
    var baseMaps = {
      "Satellite": satellite,
      "Scenic": scenic,
      "Plain": northstar
    };

    // Load map layers and serve to mymap.
    L.control.layers(baseMaps).addTo(mymap);

    //Awesome Markers global variables
    var testMarkerRed = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'darkred'
    });

    var testMarkerGreen = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'green'
    });

    var testMarkerBlue = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'blue'
    });

    var testMarkerGray = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'lightgray'
    });



    var current_position, current_accuracy;

//Function for constantly calling location and serving it as a marker to the map, vital in proximity function.
function onLocationFound(e) {
  if (current_position) {
      mymap.removeLayer(current_position);
      mymap.removeLayer(current_accuracy);
  }

  //GPS Accurracy radius around point, giving you an idea of location error. 
  var radius = e.accuracy / 2;

  current_position = L.marker(e.latlng,{icon:testMarkerBlue}).addTo(mymap)
    

  current_accuracy = L.circle(e.latlng, radius).addTo(mymap);
}

//Error handling for no location access
function onLocationError(e) {
  alert(e.message);
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

function locate() {
  mymap.locate({setView: false, maxZoom: 20});
}

//call locate every 3 seconds... forever
setInterval(locate, 3000);