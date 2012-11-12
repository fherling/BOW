var geocoder;
var map;
var markersArray = [];

function initializeMap() {
	geocoder = new google.maps.Geocoder();
	var mapOptions = {
		center : new google.maps.LatLng(0, 0),
		zoom : 1,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(query("#map_canvas"), mapOptions);
}

function resetMap() {
	clearMarkers();
	map.setZoom(1);
	map.setCenter(new google.maps.LatLng(0, 0));
}

function setMapLocation(address) {

	clearMarkers();

	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location
			});
			markersArray.push(marker);

			map.setZoom(8);
			map.setCenter(marker.getPosition());
		} else {
			alert("Geocode was not successful for the following reason: "
					+ status);
		}
	});
}

function clearMarkers() {
	if (markersArray) {
		for ( var i = 0; i < markersArray.length; i++) {
			markersArray[i].setMap(null);
		}
	}
}