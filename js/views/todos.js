// js/views/todos.js

var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({
	//... is a list tag.
	tagName: 'li',

	// Cache the template function for a single item.
	template: _.template( $('#item-template').html() ),

	// Re-render the titles of the todo item.
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},
});