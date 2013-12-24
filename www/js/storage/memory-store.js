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
		{"id": 1, "name": "Mission Inn", "lon": -117.37491, "lat": 33.978155, "distance": 10, "phone": "123-456-7890", "street":"458 Mission St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/The_Mission_Inn_Hotel_%26_Spa", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'mission_inn'},
		{"id": 2, "name": "Riverside County Historic Courthouse", "lon": -117.37486, "lat": 33.9790, "distance": 10,"phone": "123-456-7890", "street":"4050 Main St.", "city":"Riverside", "state":"CA", "weblink":"http://www.riverside.courts.ca.gov/bldgs/historic.shtml", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'riverside_county_historic_courthouse'},
		{"id": 3, "name": "Universalist Unitarian Church of Riverside", "lon": -117.37470, "lat": 33.9785, "distance": 10, "phone": "123-456-7890", "street":"3657 Lemon St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/Universalist_Unitarian_Church_of_Riverside", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'universalist_unitarian_church_of_riverside'},
		{"id": 4, "name": "Riverside Metropolitan Museum", "lon": -117.37460, "lat": 33.9760, "distance": 10, "phone": "123-456-7890", "street":"3580 Mission Inn Ave.", "city":"Riverside", "state":"CA", "weblink":"http://www.riversideca.gov/museum/", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt', 'urlstring':'riverside_metropolitan_museum'}
        ];
		
    callLater(successCallback);
}