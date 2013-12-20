var app = {
    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
		//document.on("deviceready", this.startTracking); 
		/*fake event that we can trigger to run tests*/
		//$(document).on('click', app.startTracking); 
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
			$('#textDisplay').html(statue.info);
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
	//phonegap merges
	startTracking: function() {
		var options = {enableHighAccuracy: true};
		//console.log('calling fake position function from startTracking');
		//app.fakePosition(app.updateDistance);
		watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
	},
	onSuccess: function (position) {
		//console.log('onSuccess called');
		var distance = app.getDistanceFromLatLonInFeet(position.geoy,position.geox,0,0);
		//console.log(distance);
		//MODIFY THIS
		$('#distance_'+position.id).html(position.distance - distance);
		if (position.distance - distance<1.5) {
			//AND THIS
			location.href="#employees/" + position.id;		
		}
	},
	onError: function (error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	},
	/*
	fakePosition: function (successCallback, errorCallback) {
		if (true){
			this.counter++;
			var self = this;
			if (!this.functionRunning && this.counter > 4){
			this.functionRunning = true;
			setTimeout(function(){ 
				//successCallback(); i dont know why this doesn't work
				self.updateDistance();
			}, 500);
			}				
			return;
		}
		errorCallback;
	},
	updateDistance: function() {
		for (var i=0; i < this.numStatues; i++) {
			console.log(this.store.employees[i]);
			var distance = app.getDistanceFromLatLonInFeet(this.store.employees[i].geoy,this.store.employees[i].geox,0,0);
			console.log(distance);
			$('.distance_'+this.store.employees[i].id).html(this.store.employees[i].distance - distance);
			if (this.store.employees[i].distance - distance<1.5) location.href="#employees/" + this.store.employees[i].id;
		}
		this.functionRunning = false;
	},
	*/
	getDistanceFromLatLonInFeet: function (lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1);
		var a =
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
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
		var watchID = null;
        var self = this;
        this.detailsURL = /^#statues\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            self.route();
        });
    }
};
$(window).load(app.initialize());
