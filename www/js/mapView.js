var mapper = {
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
			title:"Hello World!"
		});
		
		for (var i=0; i < app.store.statues.length; i++) {
			var statue = app.store.statues[i];
			
			//var distance = app.getDistanceFromLatLonInFeet(this.store.employees[i].geoy,this.store.employees[i].geox,0,0);
			new google.maps.Marker({
				position: new google.maps.LatLng(statue.lat,statue.lon),
				map: this.map,
				title:statue.name
			});
			console.log(statue);	//$('.distance_'+this.store.employees[i].id).html(this.store.employees[i].distance - distance);
			//if (this.store.employees[i].distance - distance<1.5) location.href="#employees/" + this.store.employees[i].id;
		}
    }    
}
