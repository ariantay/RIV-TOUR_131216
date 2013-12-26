var mapper = {
	resize: function() {
		if (!mapper.attached){
			google.maps.event.trigger(mapper.map, 'resize');
			var tempCenter = new google.maps.LatLng(33.97801, -117.374814);
			mapper.map.setCenter(tempCenter); 
			mapper.map.setZoom(17);
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
		google.maps.event.addListener(marker, 'click', function() {
			app.routeTo(marker.index);
		});
		for (var i=0; i < app.store.statues.length; i++) {
			var statue = app.store.statues[i];
			//** the same event handler is being binded to all the markers ** fix later
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(statue.lat,statue.lon),
				map: this.map,
				title:statue.name,
				index: statue.id
			});
			google.maps.event.addListener(marker, 'click', function() {
				app.routeTo(marker.index);
			});
			
		}
		
		this.attached = false;
		console.log(mapper.map);
    }    
}
