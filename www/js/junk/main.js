var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    registerEvents: function() {
		//routing function here
        $(window).on('hashchange', $.proxy(this.route, this));
		/* **Not required right now -- Highlights taps**
        $('#bottom').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('#bottom').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappab le-active');
        });
		*/
    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
		//if initial load, create new homepage, otherwise load current one if no hash
		//slidepage can detect routing of new homepage.
		//*Not necessary for riv app, but smart...
		//Note elements inserted at div #middle
        if (!hash) {
			//console.log('before');
            $('#middle').html(new HomeView(this.store).render().el);
			setTimeout(function(){ 
				$('.flexslider').flexslider({
					animation: "slide"
				});
			}, 250);
			//console.log('after');
			//console.log('after2');
			/*
			
			$('.flexslider').removeData('flexslider');
			$('.flexslider').flexslider({
				animation: "slide"
			});
			*/
			return;
		}	
        var match = hash.match(this.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('#middle').html(new EmployeeView(employee).render().el);
            });
			setTimeout(function(){ 
				$('.flexslider').flexslider({
					animation: "slide"
				});
			}, 250);
        }
    },
/* **NO SLIDE PAGE FOR NOW**
    slidePage: function(page) {
	//this is the only guy that handles the transition
        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('#middle').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('#middle').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    },
*/
    initialize: function() {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            self.route();
        });
		
		/*  *This isnt going to work...render is called dynamically*
		$(window).load(function() {
			$('.flexslider').flexslider({
				animation: "slide"
			});
		});
		*/
    }

};

app.initialize();
