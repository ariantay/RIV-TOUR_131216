var app = {
    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
    },
	routeTo: function(statueID) {
		//to prevent auto routing 
		if($('#checkbox-1').is(':checked')){
			return;
		}
		//change header
		if (statueID === app.numStatues){
			$('#headerText').html('City of Riverside');
            $('.audioFile_home').attr('src','audio/tourhome_eng.mp3');
            
		}else{
			var statue = app.store.statues[statueID];
			$('#headerText').html(statue.name);
			var language = $('input[name="radio-choice-2"]:checked').val();
			if (language == 'english'){
				$('#statue_text').html(statue.info.english);
				$('.audioFile').attr('src','audio/'+statue.urlstring+'_eng.mp3');			
			}else{
				$('#statue_text').html(statue.info.spanish);
				$('.audioFile').attr('src','audio/'+statue.urlstring+'_esp.mp3');
			}
            
            $('.audioControl').trigger('load');
            
			//change images
			$('.image_1').attr('src','img/'+statue.urlstring+'_1.jpg');
			$('.image_2').attr('src','img/'+statue.urlstring+'_2.jpg');
			$('.image_3').attr('src','img/'+statue.urlstring+'_3.jpg');
			$('.image_4').attr('src','img/'+statue.urlstring+'_4.jpg');
			$('.image_5').attr('src','img/'+statue.urlstring+'_5.jpg');
		}
		//reload flexslider
		
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
			for (var i=0; i<app.numStatues; i++) {
				var statue = app.store.statues[i];
				var distance = app.getDistanceFromLatLonInFeet(position.coords.latitude,position.coords.longitude,statue.lat,statue.lon);
				var htmlString = 'id_' + statue.id + ' is ' + Math.floor(distance) + ' feet away<br/>';
				if(distance <= statue.distance && cur_statue != statue.id){
					app.routeTo(statue.id);
					return;
				}
			}
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
		return deg * (Math.PI/180);
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
//HOMEPAGE
$(document).on("pagecreate", "#homepage", function () {
	if(!app.initialized){
		app.initialize();	
		watchID = app.startTracking();
	}
	cur_page = 0;
	cur_statue = -1;
});	
$(document).on("pagebeforeshow", "#homepage", function () {
               cur_page = 0;
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h3').html("City of Riverside Tour Guide");
		$('#map_link span.ui-btn-text').html("Begin Tour");
		$('#list_link span.ui-btn-text').html("Statue List");
		$('#settings_link span.ui-btn-text').html("Settings");
		$('.home_audioFile').attr('src','audio/spirit_eng.mp3');
		$('#home_text').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;International Spirit of Riverside</br></br>" +
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside has long maintained a spirit of Internationalism and recognition of its multicultural history.  Going back to Frank Miller, the founder of the Mission Inn, Riverside has hosted dignitaries from countries all over the world and provided leadership on an International scale.  Riverside’s multiculturism has existed for nearly 150 years with large segments of various cultures within its population going back to the 1870s.  For example the Mission Inn hosted Japanese, Russian and European dignitaries, national and important state politicians and celebrities, such as several US presidents, Prince Kaya of Japan, Prince Gustav of Sweden, Booker T. Washington, John Muir, and Amelia Earhart.  The World Affairs Council was started in Riverside at the Mission Inn (and was once attended by John F. Kennedy here) and other international peace and social conferences have been hosted here.</br></br>" + 
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside was the first American city to take part in the International Sister City program initiated after World War II. That tradition continues today with a robust and global Sister City program including cities in the countries of Japan, Mexico, Korea, China, India, Ghana and Germany.  The Statues of Main Street Riverside embody this spirit of internationalism with recognition of various significant civil rights and historical leaders, some with international or national significance, and others of prominent local importance.");
	}else{
		$('#header h3').html("Ciudad de Riverside Guía de Turismo");
		$('#map_link span.ui-btn-text').html("Comensar");
		$('#list_link span.ui-btn-text').html("Lista");
		$('#settings_link span.ui-btn-text').html("Ajustes");
		$('.home_audioFile').attr('src','audio/spirit_esp.mp3');
		$('#home_text').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;El Orgullo International de Riverside</br></br>" +
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside es una ciudad que reconoce su historia multicultural y esta orgullosa de sus relaciones internacionales que mantiene hasta ahora. Todo empezó con el dueño del Mission Inn el señor Frank Miller que invitaba a dignatarios del rededor del mundo a que se hospedaran en este lugar. La riqueza de tantas culturas ha existido por más de 150 años comenzando desde 1870.</br></br>" + 
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;El Mission Inn ha tenido invitados dignitarios  japoneses, rusos,  y europeos. Otros invitados incluyen políticos nacionales y locales, gente famosa, presidentes de los Estados Unidos, el príncipe Kaya de Japón, el príncipe Gustavo de Suecia, el activista Booker T. Washington, el escritor John Muir, y la primera mujer de aviación Amelia Earhart. La Consejería de los Asuntos Mundiales empezó en Riverside en el Mission Inn y fue asistida por John F. Kennedy una vez. Otras conferencias para paz internacional y otros eventos sociales también tomaron lugar en este sitio.</br></br>" +
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Riverside fue la primera ciudad Americana en participar en el programa de Ciudades Hermanas Internacionales que empezó después de la segunda guerra mundial. Esa tradición continúa hasta este día y más ciudades como Japón, México, Corea, China, India, Ghana, y Alemania son ya miembros de este gran programa. Las estatuas en la calle Main son un símbolo de orgullo internacional que reconocen a varios e importantes líderes de los derechos humanos y de la historia.");
	}
	
	$('.home_audioControl').trigger('load');
});
//TOURPAGE_HOME EVENTS
$(document).on("pagebeforeshow", "#tourpage_home", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h1').html("Tour");
		$('#popupBasic p:first').html("Please make your way to the nearest statue.");
	}else{
		$('#header h1').html("Gira");
		$('#popupBasic p:first').html("Por favor, haga su camino hacia la estatua mas cercana.");
	}
});
$(document).on("pageshow", "#tourpage_home", function () {
	if(!$('#checkbox-2').is(':checked')){
		console.log($('#checkbox-2').is(':checked'))
		//$('.audioControl').trigger('play');
		//$('#tourhome_audioContainer audio').trigger('play');
	}
	mapper.resize();
	cur_page = 1;
	cur_statue = -1;
	lock = 0;
});
$(document).on("pagehide", "#tourpage_home", function () {
	//$('.audioControl').trigger('pause');
	//$('.audioControl').prop('currentTime',0);
});
//TOURPAGE EVENTS
$(document).on("pagebeforeshow", "#tourpage", function () {
});
$(document).on("pageshow", "#tourpage", function () {
               
               $('.flexslider').flexslider({
                                           animation: "slide",
                                           controlNav: false
                                           });
               
	if(!$('#checkbox-2').is(':checked')){
	$('.audioControl').trigger('play');
		//$('#audioContainer audio').trigger('play');
	}
	//$("#statue_text").scrollTop(0);
	$("#textContainer").scrollTop(0);
	$(window).resize();		//slider won't show until resize...
	cur_page = 1;
    lock = 0;
});
$(document).on("pagehide", "#tourpage", function () {
	$('.audioControl').trigger('pause');
	$('.audioControl').prop('currentTime',0);
});

//SETTINGS EVENTS
$(document).on("pagebeforeshow", "#settings", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h1').html("Settings");
		$('#settings_legend_1 a').html("Language");
		$('#settings_legend_2 a').html("Disable Auto-Routing");
	}else{
		$('#header h1').html("Ajustes");
		$('#settings_legend_1 a').html("Idioma");
		$('#settings_legend_2 a').html("Inutilizar Enrutamiento Automático");
	}
});
$(document).on("pageshow", "#settings", function () {
	mapper.resize();
	cur_page = 0;
	cur_statue = -1;
});
//STATUELIST EVENTS
$(document).on("pagecreate", "#statuelist", function () {
	app.createStatuelist();
	cur_page = 0;
	cur_statue = -1;
});
$(document).on("pagebeforeshow", "#statuelist", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#header h1').html("Statue List");
	}else{
		$('#header h1').html("Lista De Estatuas");
	}
});
//STATUEDETAILS EVENTS
$(document).on("pagecreate", "#statuedetails", function () {
	cur_page = 0;
	cur_statue = -1;
});
$(document).on("pagebeforeshow", "#statuedetails", function () {
	var language = $('input[name="radio-choice-2"]:checked').val();
	if (language == 'english'){
		$('#detail_box span.ui-btn-text').html("Detail");
		$('#address_box span.ui-btn-text').html("Address");
	}else{
		$('#detail_box span.ui-btn-text').html("Detalles");
		$('#address_box span.ui-btn-text').html("Dirección");
	}
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