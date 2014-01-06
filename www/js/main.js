var app = {
    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
    },
	routeTo: function(statueID) {
		if (statueID === app.numStatues){
			$('#headerText').html('City of Riverside');
		}else{
			var statue = app.store.statues[statueID];
			$('#headerText').html(statue.name);
			var language = $('input[name="radio-choice-2"]:checked').val();
			if (language == 'english'){
				$('#statue_text').html(statue.info.english);
			}else{
				$('#statue_text').html(statue.info.spanish);
			}
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
        cur_statue = statueID;
		console.log("Navigating to:  " + statueID + " - " + statue.name);
		console.log("cur_statue " + cur_statue);
		console.log("current language: " + language);
		$.mobile.changePage("#tourpage");
	},
	showDetails: function(statueID) {
		var statue = app.store.statues[statueID];
		$('#statuedetails_thumb').attr('src','img/'+statue.urlstring+'_thumb.jpg');
		$('#statuedetails_thumbtext h2').html(statue.name);
		$('#statuedetails_thumbtext p').html(statue.lon + ' ' + statue.lat);
		
		var language = $('input[name="radio-choice-2"]:checked').val();
		if (language == 'english'){
			$('#statuedetails_detailstext p').html(statue.info.english);
		}else{
			$('#statuedetails_detailstext p').html(statue.info.spanish);
		}
		$('#statuedetails_address p').html(statue.street);
		
		$.mobile.changePage("#statuedetails");
	},
	createStatuelist: function() {
		//append list
		if (!app.statuelistCreated){
			var html = '';
			for (var i=0; i<app.numStatues; i++) {
				var statue = app.store.statues[i];
				html += '<li>';
				html += '<img src=img/' + statue.urlstring + '_1.jpg>';
				html += '<h3>' + statue.name + '</h3>';
				html += '<p style="font-size: 0.7em">' + statue.lon + ", " + statue.lat + '</p>';
				html += '</li>';
			}
			$('#statuelist_holder').append(html);
		}
		//add onclick 
		$('#statuelist_holder li').each(function(i) {
			$(this).click(function(){
				//link to details page
				app.showDetails(i);
			});
		});
		app.statuelistCreated = true;
	},	
	startTracking: function() {
        //alert("calling startTracking");
		var options = {
			frequency : 4000,
			maximumAge : 30000,
			enableHighAccuracy : true
		};
		//app.watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, options);
		return navigator.geolocation.watchPosition(app.onSuccess, app.onError, options);
	},
	onSuccess: function (position) {
		//update our map marker with our current location
		if (mapper){
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			mapper.marker.setPosition(latlng);
		}	
        if (cur_page == 1 && lock == 0){
            lock = 1;
			console.log("calling on success");			
			//var el = $(document.createElement('div'));
			//$(el).attr('id', 'temp');
		for (var i=0; i<app.numStatues; i++) {
			var statue = app.store.statues[i];
			var distance = app.getDistanceFromLatLonInFeet(position.coords.latitude,position.coords.longitude,statue.lat,statue.lon);
			var htmlString = 'id_' + statue.id + ' is ' + Math.floor(distance) + ' feet away<br/>';
			//el.append(htmlString);
			//alert("Statue: " + statue.id + ", Distance " + distance);
            if(distance <= statue.distance && cur_statue != statue.id){
                app.routeTo(statue.id);
                return;
            }
		}
		//alert("End of onSuccess");
		//var el2 = $("<div/>");
		//$(el2).append(el);
        //$('#statue_text').html(el);
            lock = 0;
        }
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
        this.lock = 0;
		//var watchID = app.startTracking();
        var self = this;
        this.detailsURL = /^#statues\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
           window.mapper.initialize();
        });
		this.initialized = true;
		this.statuelistCreated = false;
    }
};

var cur_statue = -1;
var cur_page = 0;  //used to determine if on tour pages or not
//jquery mobile events handling
// ** need to mute audio on page change later **
$(document).on("pagecreate", "#homepage", function () {
	if(!app.initialized){
		app.initialize();	
		watchID = app.startTracking();
	}
	cur_page = 0;
	cur_statue = -1;
});	
$(document).on("pageshow", "#tourpage", function () {
	$(window).resize();		//slider won't show until resize...
	cur_page = 1;
               lock = 0;
});
$(document).on("pageshow", "#tourpage_home", function () {
	mapper.resize();
	cur_page = 1;
               cur_statue = -1;
               lock = 0;
});
$(document).on("pageshow", "#settings", function () {
	mapper.resize();
	cur_page = 1;
	cur_statue = -1;
});
$(document).on("pagecreate", "#statuelist", function () {
	app.createStatuelist();
	cur_page = 0;
	cur_statue = -1;
});
$(document).on("pagecreate", "#statuedetails", function () {
	cur_page = 0;
	cur_statue = -1;
});
//fix for ios 7 status bar ** doesnt work leave for later
/*
function onDeviceReady() {
    if (parseFloat(window.device.version) === 7.0) {
          document.body.style.marginTop = "20px";
    }
} 
document.addEventListener('deviceready', onDeviceReady, false);
*/