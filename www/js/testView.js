var TestView = function(){
	this.initialize = function () {
	$('.slides').html(TestView.template({"id": 1, "name": "Mission Inn", "geox": 33.983, "geoy": -117.373, "phone": "123-456-7890", "street":"458 Mission St.", "city":"Riverside", "state":"CA", "weblink":"http://en.wikipedia.org/wiki/The_Mission_Inn_Hotel_%26_Spa", "info":"Long text that we use to test scrolling text later, audio link we can use id, need to verify other kinds of information later that we can use to test stuff"}));
	};
	this.initialize();
}
TestView.template = Handlebars.compile($('#test-tpl').html());