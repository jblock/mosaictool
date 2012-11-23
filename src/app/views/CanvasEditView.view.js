App.CanvasEditView = Backbone.View.extend({
	id: 'mainCanvas',

	initialize: function() {
		this.imagePane = $('<canvas id="imageSource"></canvas>');
		this.render();
	},

	render: function() {
		this.imagePane.appendTo(this.el);
		Utils.c.log('Rendered main canvas editing pane');
	}
});