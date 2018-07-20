var map = null;
var markerCluster= null;
var markers=[];
let isIdle=true;
var iconBase = 'img/';
var icons = {};
var nw, se = null;

const pcenter = {
		lat: 36.3,
		lng: 128.01
};

var myMap=function() {
	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 3,
	    center: {lat: pcenter.lat, lng: pcenter.lng},
	    mapTypeControl: true,
 		mapTypeControlOptions: {
 		    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
 		    position: google.maps.ControlPosition.TOP_CENTER
 		},
	    zoomControl: true,
 		zoomControlOptions: {
 		    position: google.maps.ControlPosition.LEFT_CENTER
 		},
 		scaleControl: true,
 		streetViewControl: true,
 		streetViewControlOptions: {
 		    position: google.maps.ControlPosition.LEFT_TOP
 		},
 		fullscreenControl: true
	  });
	  
	//Initialize Object[icons] for using google api  
	initParameters();
	
    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    }); // end markers

    // Add Event Listener
    map.addListener('bounds_changed', getNewPos);
    map.addListener('idle', ()=>{
  	  isIdle=true;
    });

    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  	var input = document.getElementById('searchbox0122');
  	var searchBox = new google.maps.places.SearchBox(input);
};

function getNewPos(event) {
	if(!isIdle) return;
   // map.panTo(map.getCenter());
    console.log(map.getCenter().lat(),map.getCenter().lng());
    //console.log(pcenter.lat, pcenter.lng);
    var ne = map.getBounds().getNorthEast();
    var sw = map.getBounds().getSouthWest();
    nw = new google.maps.LatLng(ne.lat(),sw.lng());
    se = new google.maps.LatLng(sw.lat(),ne.lng());

    var str = 'New north-west corner: ' + nw.lat() + ', ' + nw.lng() + '<br>' +
    'New south-east corner: ' + se.lat() + ', ' + se.lng();
    console.log(str);
    $.ajax({
    	  type: 'POST',
    	  url: 'getspots.mw',
    	  data: {
    		  nwlng: nw.lng(),
    		  nwlat: nw.lat(),
    		  selng: se.lng(),
    		  selat: se.lat()
    	  },
    	  success: function(data){
    		  console.log(data);
    		  if(markers.length!=0){
    			  markers.forEach(function(elm,index){
    				  elm.setMap(null);
    				  markerCluster.clearMarkers();
    			  });
			  };
			  console.log(data.length);
    		  for(var i = 0;i < data.length; i ++){
    			  const marker = new google.maps.Marker({
    				  position: {lat: data[i].lat, lng: data[i].lng},
		          	  icon: icons.wc.icon,
		          	  map: map,
		          	  title: data[i].id,
		          	  label: data[i].category
	    		  });
	    		  markers.push(marker);
	    		  marker.addListener('click', function() {
	    			  map.setZoom(8);
	    		      map.setCenter(marker.getPosition());
	    		       
	    		      //information
	    		  });
	    		  markerCluster.addMarker(marker);
			  };
    	  },
    	  dataType: 'json'
	});
    isIdle=false;

    /*var contentString = '<b>Rectangle moved.</b><br>' +
        'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
        'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

    // Set the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(ne);

    infoWindow.open(map);*/
}

function initParameters(){
	icons = {
	   	parking: {
	  		icon: iconBase + 'parking_lot_maps.png'
	   	},
	   	library: {
	   		icon: iconBase + 'library_maps.png'
	   	},
	   	info: {
	   		icon: iconBase + 'info-i_maps.png'
	   	},
	   	wc: {
	   		icon: {
	   			url: iconBase + 'icon_wc.png',
	   			size: new google.maps.Size(71, 71),
	  		  	origin: new google.maps.Point(0, 0),
	  		  	anchor: new google.maps.Point(17, 34),
	  		  	scaledSize: new google.maps.Size(25, 25)
			}
	   	}
	};
};

var locations = [
    {lat: -31.563910, lng: 147.154312},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -33.851702, lng: 151.216968},
    {lat: -34.671264, lng: 150.863657},
    {lat: -35.304724, lng: 148.662905},
    {lat: -36.817685, lng: 175.699196},
    {lat: -36.828611, lng: 175.790222},
    {lat: -37.750000, lng: 145.116667},
    {lat: -37.759859, lng: 145.128708},
    {lat: -37.765015, lng: 145.133858},
    {lat: -37.770104, lng: 145.143299},
    {lat: -37.773700, lng: 145.145187},
    {lat: -37.774785, lng: 145.137978},
    {lat: -37.819616, lng: 144.968119},
    {lat: -38.330766, lng: 144.695692},
    {lat: -39.927193, lng: 175.053218},
    {lat: -41.330162, lng: 174.865694},
    {lat: -42.734358, lng: 147.439506},
    {lat: -42.734358, lng: 147.501315},
    {lat: -42.735258, lng: 147.438000},
    {lat: -43.999792, lng: 170.463352}
  ]


