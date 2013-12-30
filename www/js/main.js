var app = {
    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
    },
	routeTo: function(statueID) {
		if (statueID === app.numStatues){
			$('#headerText').html('City of Riverside');
			// ** next steps - implement load to tour map **
		}else{
			var statue = app.store.statues[statueID];
			// ** debugging marker on click issue **
			console.log("Navigating to:  " + statueID + " - " + statue.name);
			$('#headerText').html(statue.name);
			$('#statue_text').html(statue.info);
			$('.audioFile').attr('src','audio/'+statue.urlstring+'_1.mp3');
			$('.image_1').attr('src','img/'+statue.urlstring+'_1.jpg');
			$('.image_2').attr('src','img/'+statue.urlstring+'_2.jpg');
			$('.image_3').attr('src','img/'+statue.urlstring+'_3.jpg');
			$('.image_4').attr('src','img/'+statue.urlstring+'_4.jpg');
			$('.image_5').attr('src','img/'+statue.urlstring+'_5.jpg');
		}
		$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false
		});
		$.mobile.changePage("#tourpage");
	},
	startTracking: function() {
		var options = {enableHighAccuracy: true};
		app.watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, options);
	},
	onSuccess: function (position) {
		console.log("calling on success");
		var el = $(document.createElement('div'));
		$(el).attr('id', 'temp');
		for (var i=0; i < this.numStatues; i++) {
			var statue = this.store.statues[i];
			var distance = app.getDistanceFromLatLonInFeet(position.coords.latitude,position.coords.longitude,statue.lat,statue.lon);
			var htmlString = 'id_' + statue.id + ' is ' + Math.floor(distance) + ' feet away<br/>';
			//el.append(htmlString);
		}
		var el2 = $("<div/>");
		$(el2).append(el);
		//$('#statue_text').html(el);
	},
	onError: function (error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	},
	getDistanceFromLatLonInFeet: function (lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = app.deg2rad(lat2-lat1);  // deg2rad below
		var dLon = app.deg2rad(lon2-lon1);
		var a =
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(app.deg2rad(lat1)) * Math.cos(app.deg2rad(lat2)) *
		Math.sin(dLon/2) * Math.sin(dLon/2)
		;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c * 3280.8; // Distance in feet
		return d;
	},  
	deg2rad: function (deg) {
		return deg * (Math.PI/180)
	},    
    initialize: function() {
		//this.statueID = 0;	// **not needed, explicitly call destination **
		this.numStatues = 6;
		this.functionRunning = false;
		this.counter = 0;
		var watchID = app.startTracking();
        var self = this;
        this.detailsURL = /^#statues\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
           window.mapper.initialize();
        });
		this.initialized = true;
    }
};
//jquery mobile events handling
// ** need to mute audio on page change later **
$(document).on("pagecreate", "#homepage", function () {
   if(!app.initialized){
	app.initialize();
   }
});	
$(document).on("pageshow", "#tourpage", function () {
	$(window).resize();		//slider won't show until resize...
});
$(document).on("pageshow", "#tourpage_home", function () {
	mapper.resize();
});
