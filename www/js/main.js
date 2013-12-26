var app = {
    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
    },
    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
			$('#headerText').html('City of Riverside');
			//location.href='#';
		}	
        var match = hash.match(this.detailsURL);
        if (match) {
			var statue = this.store.statues[Number(match[1])];
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
    },
	startTracking: function() {
		var options = {enableHighAccuracy: true};
		app.watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, options);
	},
	onSuccess: function (position) {
		var el = $(document.createElement('div'));
		$(el).attr('id', 'temp');
		for (var i=0; i < this.numStatues; i++) {
			var statue = this.store.statues[i];
			var distance = app.getDistanceFromLatLonInFeet(position.coords.latitude,position.coords.longitude,statue.lat,statue.lon);
			var htmlString = 'id_' + statue.id + ' is ' + Math.floor(distance) + ' feet away<br/>';
			el.append(htmlString);
		}
		var el2 = $("<div/>");
		$(el2).append(el);
		$('#statue_text').html(el);
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
		this.numStatues = 4;
		this.functionRunning = false;
		this.counter = 0;
		var watchID = app.startTracking();
        var self = this;
        this.detailsURL = /^#statues\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
           window.mapper.initialize();
        });
		this.route();
		this.initialized = true;
    }
};
//app.initialize();
//console.log(numStatues); need to initialize right away in here.
//use below event to check global variable and load the proper page
$(document).on("pagecreate", "#homepage", function () {
   if(!app.initialized){
	app.initialize();
   }
});	
$(document).on("pageshow", "#tourpage", function () {
	app.route();
	//slider won't show until resize, weird
	$(window).resize();
	console.log(mapper.map);
});
/*
$(document).on("pageshow", "#loginPage", function () {
    alert("here 2");
$("#tourpage").on("pageshow" , function() {
	$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false
	});
});
*/