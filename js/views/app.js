// js/views/app.js

var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#todoapp',

	// Delegated events for creating new items, and clearing completed ones.
	events: {
		'keypress #new-todo': 'createOnEnter',
		// New
		'click #toggle-all': 'toggleAllComplete'
	},

	// At initialization we bind to the relevant events on the `Todos`
	// collection, when items are added or changed. Kick things off by
	// loading any preexisting todos that might be saved in *localStorage*.
	initialize: function() {
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');
		//New
		this.allCheckbox = this.$('#toggle-all')[0];

		this.listenTo(app.Todos, 'add', this.addOne);
		app.Todos.fetch();
	},

	// Add a single todo item to the list by creating a view for it, and
	// appending its element to the `<ul>`.
	addOne: function( todo ) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view.render().el );
	},

	// Generate the attributes for a new Todo item.
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	// If you hit return in the main input field, create new Todo model,
	// persisting it to localStorage.
	createOnEnter: function( event ) {
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}

		app.Todos.create( this.newAttributes() );
		this.$input.val('');
	},
	
	// New
	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Todos.each(function( todo ) {
			todo.save({
			  'completed': completed
			});
		});
	}
});