var app = {
    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
		
		//set a listener for device ready for phonegap
		//document.on("deviceready", this.startTracking); 
		/*fake event that we can trigger to run tests*/
		//$(document).on('click', app.startTracking); 

    },
	
    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
			this.store.findById(1, function(employee) {
                $('#middle').html(new EmployeeView(employee).render().el);
            });	
			//$('.button').trigger('click'); /*this is here because for some reason the button needs to be double tapped initially to start responding*/
		}	
        var match = hash.match(this.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('#middle').html(new EmployeeView(employee).render().el);
            });
        }
		setTimeout(function(){ 
			$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false
			});
			
			$('.button').on('click', function() {
				location.href='index.html';
				/*$('.button').pageslide({direction: 'right', href:'#temp', modal:'true'});	*/
			});
			//$('.button').trigger('click');
			/*$('.button').on('click', function() {
				//location.href='geolocation_modified.html';
				$('.button').pageslide({direction: 'right', href:'#temp'});	
			});*/
		}, 10);
    },
	//phonegap merges
	startTracking: function() {
		//EVENTS CAN BE REBINDEED IN ON SUCCESS IF IT IS ONE CALL
		//unbind event to prevent rapid fire
		//$(document).unbind('click',app.startTracking);
		
		var options = {enableHighAccuracy: true};
		console.log('calling fake position function from startTracking');
		app.fakePosition(app.updateDistance/*, app.onError*/); //why do i have to explicitly specify app.fakePosition? really need to read up on functions more
		/*app.fakePosition(app.onSuccess());  with the parentheses, inner function gets called right away...weird*/
		//navigator.notification.alert("about to call watchPosition", null, "onDeviceReadyFired!", 'OK');
		/*watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);*/
	},
	onSuccess: function (position) {
		//console.log('onSuccess called');
		var distance = app.getDistanceFromLatLonInFeet(position.geoy,position.geox,0,0);
		console.log(distance);
		$('#distance_'+position.id).html(position.distance - distance);
		if (position.distance - distance<1.5) {
			console.log(window.location.hash);
			location.href="#employees/" + position.id;		
		}
		/*
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
		'Longitude: ' + position.coords.longitude     + '<br />' +
		'Distance from Cabin Sushi in feet: ' + getDistanceFromLatLonInFeet(position.coords.latitude,position.coords.longitude,33.981197,-117.376176)     + '<br />' +
		'<hr />'      + element.innerHTML;
		//triggers url change here
		if (getDistanceFromLatLonInFeet(position.coords.latitude,position.coords.longitude,33.981197,-117.376176) < 240) {
			location.href="index.html#employees/3"
		}
		*/
	},
	onError: function (error) {
		//console.log('onerror');
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	},
	fakePosition: function (successCallback, errorCallback) {
		//true condition below is a placeholder.  implement a real check later
		if (true){
			//onSuccess we will receive a position object. We will fake event callback and delay.
			//console.log('in fake position'); 
			//successCallback({coords: 'coords'});
			//return;
			this.counter++;
			var self = this;
			/*
			//REPLACE THIS WITH A BATCH RETURN OF ALL ELEMENTS -- store.employees
			setTimeout(function(){ 
				for (var i=1; i <= length; i++) {
					self.store.findById(i, successCallback);
				} 
			}, 3000);		
			return;
			*/
			//console.log(successCallback);
			if (!this.functionRunning && this.counter > 4){
			this.functionRunning = true;
			setTimeout(function(){ 
				//successCallback(); /*i dont know why this doesn't work*/
				self.updateDistance();
			}, 500);
			}				
			return;
		}
		errorCallback;
	},
	updateDistance: function() {
		//console.log(this.store);
		for (var i=0; i < this.numStatues; i++) {
			console.log(this.store.employees[i]);
			var distance = app.getDistanceFromLatLonInFeet(this.store.employees[i].geoy,this.store.employees[i].geox,0,0);
			console.log(distance);
			$('.distance_'+this.store.employees[i].id).html(this.store.employees[i].distance - distance);
			if (this.store.employees[i].distance - distance<1.5) location.href="#employees/" + this.store.employees[i].id;
		}
		this.functionRunning = false;
	},
	getDistanceFromLatLonInFeet: function (lat1,lon1,lat2,lon2) {
		//console.log('getDistance called');
		//fake return 
		return Math.random() * (10-1) + 1;
		/*
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
		*/
	},  
	deg2rad: function (deg) {
		return deg * (Math.PI/180)
	},
    initialize: function() {
		this.numStatues = 4;
		this.functionRunning = false;
		this.counter = 0;
		//var watchID = null;
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            self.route();
        });
		//generates list of locations
		this.store.findByName('', function(employees) {
            $('#temp').html(HomeView.liTemplate(employees));
        });	
    }
	
};
$(window).load(app.initialize());
