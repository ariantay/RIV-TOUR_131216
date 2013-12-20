var HomeView = function(store) {
//*note that store obj is fed in as a parameter
//*REMEMBER -- classes preceeded by ., id by #, base elements by nothing
//*REMINDER -- this whole thing needs a LOT of refactoring, get it to work first though
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
		this.findByName();
		//$(window).load(this.findByName);
		//		$('.flexslider').flexslider();
		//this.el.on('load','.header', this.findByName);
        //this.el.on('keyup', '.search-key', this.findByName);
    };

    this.render = function() {
		var self = this;
		//regarding the issues here...READ UP ON THE SCOPE OF A CLOSURE
		(store.findById(Number('1'), function(employee) {
			self.el.html(EmployeeView.template(employee));
        }));
		return self;
    };

    this.findByName = function() {
	//this just generates list
		store.findByName('', function(employees) {
            $('#bottom').html(HomeView.liTemplate(employees));
        });
	
        /*store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
        });*/
    };

    this.initialize();

	
}
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
