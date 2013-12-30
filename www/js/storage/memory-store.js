var MemoryStore = function(successCallback, errorCallback) {
    this.findById = function(id, callback) {
        var statues = this.statues;
        var statue = null;
        var l = statues.length;
        for (var i=0; i < l; i++) {
            if (statues[i].id === id) {
                statue = statues[i];
                break;
            }
        }
        callLater(callback, statue);
    }

    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.statues = [
		{"id": 0, "name": "Chang Ho", "lon": -117.37491, "lat": 33.978155, "distance": 10, "phone": "123-456-7890", "street":"458 Mission St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/The_Mission_Inn_Hotel_%26_Spa", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'chang-ho'},
		{"id": 1, "name": "Caesar Chavez", "lon": -117.37486, "lat": 33.9790, "distance": 10,"phone": "123-456-7890", "street":"4050 Main St.", "city":"Riverside", "state":"CA", "weblink":"http://www.riverside.courts.ca.gov/bldgs/historic.shtml", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'chavez'},
		{"id": 2, "name": "Mohammet Ghandi", "lon": -117.37470, "lat": 33.9785, "distance": 10, "phone": "123-456-7890", "street":"3657 Lemon St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/Universalist_Unitarian_Church_of_Riverside", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'gandhi'},
		{"id": 3, "name": "Martin Luther King", "lon": -117.37460, "lat": 33.9760, "distance": 10, "phone": "123-456-7890", "street":"3580 Mission Inn Ave.", "city":"Riverside", "state":"CA", "weblink":"http://www.riversideca.gov/museum/", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'king'},
        {"id": 4, "name": "Elizabeth Tibbets", "lon": -117.37400, "lat": 33.9750, "distance": 10, "phone": "123-456-7890", "street":"3580 Mission Inn Ave.", "city":"Riverside", "state":"CA", "weblink":"http://www.riversideca.gov/museum/", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'tibbets'},
		{"id": 5, "name": "Juan Villegas", "lon": -117.37460, "lat": 33.9750, "distance": 10, "phone": "123-456-7890", "street":"3580 Mission Inn Ave.", "city":"Riverside", "state":"CA", "weblink":"http://www.riversideca.gov/museum/", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'villegas'}
        ];
		
    callLater(successCallback);
}