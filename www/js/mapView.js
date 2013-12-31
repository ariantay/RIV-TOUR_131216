var mapper = {
	resize: function() {
		if (!mapper.attached){
			google.maps.event.trigger(mapper.map, 'resize');
			var tempCenter = new google.maps.LatLng(33.97801, -117.374814);
			mapper.map.setCenter(tempCenter); 
			mapper.map.setZoom(16);
		}
	},
	createMarker: function(statue) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(statue.lat,statue.lon),
			map: this.map,
			title:statue.name,
			index: statue.id
		});
		google.maps.event.addListener(marker, 'click', function() {
			app.routeTo(marker.index);
		});
		return marker;
	},
	announcePosition: function(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				function(position){alert (position.coords.latitude + " " + position.coords.longitude);},
				function(error){alert (error.code + " " + error.message);},
				{enableHighAccuracy: true,timeout: 10000,maximumAge: 5000});
		}else{
			alert('no navigator');
		}
	},
    initialize: function() {
		//create the map
		this.mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(33.97801, -117.374814)
		};
		this.map = new google.maps.Map(document.getElementById('map-canvas'),this.mapOptions); 
		//define markers
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(33.97801, -117.374814),
			map: this.map,
			title:"You are here",
			index: app.numStatues
		});
		//current position on click
		google.maps.event.addListener(marker, 'click', function() {
			//app.routeTo(marker.index);
			mapper.announcePosition();
		});
		for (var i=0; i < app.numStatues; i++) {	
			mapper.createMarker(app.store.statues[i]);
		}		
		this.attached = false;
		console.log(mapper.map);
    }    
}
