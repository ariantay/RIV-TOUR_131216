var flexsliderView = function(employee){
	this.initialize = function () {
	//is this necessary?  explore later
        this.el = $('<div/>');
	};
	
	this.render = function() {
		return flexsliderView.template(employee);
    };
}
flexsliderView.template = Handlebars.compile($('#flexslider-tpl').html());