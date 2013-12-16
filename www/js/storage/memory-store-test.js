var MemoryStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var employees = this.employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, employees);
    }

    this.findById = function(id, callback) {
        var employees = this.employees;
        var employee = null;
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        callLater(callback, employee);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.employees = [
		{"id": 1, "name": "Mission Inn", "geox": 33.983, "geoy": -117.373, "distance": 10, "phone": "123-456-7890", "street":"458 Mission St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/The_Mission_Inn_Hotel_%26_Spa", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt'},
		{"id": 2, "name": "Riverside County Historic Courthouse", "geox": 33.480, "geoy": -120.555, "distance": 10,"phone": "123-456-7890", "street":"4050 Main St.", "city":"Riverside", "state":"CA", "weblink":"http://www.riverside.courts.ca.gov/bldgs/historic.shtml", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt'},
		{"id": 3, "name": "Universalist Unitarian Church of Riverside", "geox": 33.982, "geoy": -117.372, "distance": 10, "phone": "123-456-7890", "street":"3657 Lemon St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/Universalist_Unitarian_Church_of_Riverside", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt'},
		{"id": 4, "name": "Riverside Metropolitan Museum", "geox": 33.982, "geoy": -117.372, "distance": 10, "phone": "123-456-7890", "street":"3580 Mission Inn Ave.", "city":"Riverside", "state":"CA", "weblink":"http://www.riversideca.gov/museum/", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuffLong text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff.Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff", 'textFile':'test.txt'}
        ];

    callLater(successCallback);

}