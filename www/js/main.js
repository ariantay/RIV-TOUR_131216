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
		//update our map marker and radius
		if (mapper){
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			mapper.marker.setPosition(latlng);
			mapper.circle.setCenter(latlng);
			//mapper.circle.setRadius(position.coords.accuracy);
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
$(document).on("pagebeforeshow", "#homepage", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h3').html("City of Riverside Tour Guide");
		$('#map_link span.ui-btn-text').html("Begin Tour");
		$('#list_link span.ui-btn-text').html("Statue List");
		$('#settings_link span.ui-btn-text').html("Settings");
		$('#home_text').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;International Spirit of Riverside</br></br>" +
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside has long maintained a spirit of Internationalism and recognition of its multicultural history.  Going back to Frank Miller, the founder of the Mission Inn, Riverside has hosted dignitaries from countries all over the world and provided leadership on an International scale.  Riverside’s multiculturism has existed for nearly 150 years with large segments of various cultures within its population going back to the 1870s.  For example the Mission Inn hosted Japanese, Russian and European dignitaries, national and important state politicians and celebrities, such as several US presidents, Prince Kaya of Japan, Prince Gustav of Sweden, Booker T. Washington, John Muir, and Amelia Earhart.  The World Affairs Council was started in Riverside at the Mission Inn (and was once attended by John F. Kennedy here) and other international peace and social conferences have been hosted here.</br></br>" + 
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside was the first American city to take part in the International Sister City program initiated after World War II. That tradition continues today with a robust and global Sister City program including cities in the countries of Japan, Mexico, Korea, China, India, Ghana and Germany.  The Statues of Main Street Riverside embody this spirit of internationalism with recognition of various significant civil rights and historical leaders, some with international or national significance, and others of prominent local importance.");
		/*
		$('#paragraph1').html("International Spirit of Riverside");
		$('#paragraph2').html("Riverside has long maintained a spirit of Internationalism and recognition of its multicultural history.  Going back to Frank Miller, the founder of the Mission Inn, Riverside has hosted dignitaries from countries all over the world and provided leadership on an International scale.  Riverside’s multiculturism has existed for nearly 150 years with large segments of various cultures within its population going back to the 1870s.  For example the Mission Inn hosted Japanese, Russian and European dignitaries, national and important state politicians and celebrities, such as several US presidents, Prince Kaya of Japan, Prince Gustav of Sweden, Booker T. Washington, John Muir, and Amelia Earhart.  The World Affairs Council was started in Riverside at the Mission Inn (and was once attended by John F. Kennedy here) and other international peace and social conferences have been hosted here.");
		$('#paragraph3').html("Riverside was the first American city to take part in the International Sister City program initiated after World War II. That tradition continues today with a robust and global Sister City program including cities in the countries of Japan, Mexico, Korea, China, India, Ghana and Germany.  The Statues of Main Street Riverside embody this spirit of internationalism with recognition of various significant civil rights and historical leaders, some with international or national significance, and others of prominent local importance.");
		*/
	}else{
		$('#header h3').html("Ciudad de Riverside Guía de Turismo");
		$('#map_link span.ui-btn-text').html("Comensar");
		$('#list_link span.ui-btn-text').html("Lista");
		$('#settings_link span.ui-btn-text').html("Ajustes");
		$('#home_text').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;El Orgullo International de Riverside</br></br>" +
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside es una ciudad que reconoce su historia multicultural y esta orgullosa de sus relaciones internacionales que mantiene hasta ahora. Todo empezó con el dueño del Mission Inn el señor Frank Miller que invitaba a dignatarios del rededor del mundo a que se hospedaran en este lugar. La riqueza de tantas culturas ha existido por más de 150 años comenzando desde 1870.</br></br>" + 
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside was the first American city to take part in the International Sister City program initiated after World War II. That tradition continues today with a robust and global Sister City program including cities in the countries of Japan, Mexico, Korea, China, India, Ghana and Germany.  The Statues of Main Street Riverside embody this spirit of internationalism with recognition of various significant civil rights and historical leaders, some with international or national significance, and others of prominent local importance.");
		/*
		$('#paragraph1').html("Media t'ida es la candcla, pan y vino, la otra media");
		$('#paragraph2').html("Caminante, son tus huellas el camino, y nada más; caminante, no hay camino, se hace camino al andar. Al andar se hace camino, y al volver la vista atrás se ve la senda que nunca se ha de volver a pisar.");
		$('#paragraph3').html("Media t'ida es la candcla, pan y vino, la otra media. Gracias a dios. Hasta luego. Caminante, son tus huellas el camino, y nada más; caminante, no hay camino, se hace camino al andar. Al andar se hace camino, y al volver la vista atrás se ve la senda que nunca se ha de volver a pisar. Caminante, no hay camino, sino estelas en la mar. Media t'ida es la candcla, pan y vino, la otra media. Gracias a dios. Hasta luego. Caminante, son tus huellas el camino, y nada más; caminante, no hay camino, se hace camino al andar. Al andar se hace camino, y al volver la vista atrás se ve la senda que nunca se ha de volver a pisar. Caminante, no hay camino, sino estelas en la mar.");
		*/
	}
});
$(document).on("pageshow", "#tourpage", function () {
	$(window).resize();		//slider won't show until resize...
	cur_page = 1;
    lock = 0;
});
$(document).on("pagebeforeshow", "#statuelist", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h1').html("Statue List");
	}else{
		$('#header h1').html("Lista De Estatuas");
	}
});
$(document).on("pagebeforeshow", "#statuedetails", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		//$('#header h1').html("ENGLISH");
		$('#detail_box span.ui-btn-text').html("Detail");
		$('#address_box span.ui-btn-text').html("Address");
	}else{
		//$('#header h1').html("SPANISH");
		$('#detail_box span.ui-btn-text').html("Detalles");
		$('#address_box span.ui-btn-text').html("Dirección");
	}
});
$(document).on("pagebeforeshow", "#tourpage_home", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h1').html("Tour");
		//$('#popupBasic p').html("Please make your way to the nearest statue.");
	}else{
		$('#header h1').html("Gira");
		//$('#popupBasic p').html("Por favor, haga su camino hacia la estatua mas cercana.");
	}
});
$(document).on("pagebeforeshow", "#settings", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h1').html("Settings");
	}else{
		$('#header h1').html("Ajustes");
	}
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