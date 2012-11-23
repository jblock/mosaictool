App.CanvasView = Backbone.View.extend({

	id: 'canvasPane',

	initialize: function() {
		Utils.c.log('initialized CanvasView');
		this.render();
	},

	render: function() {
		this.menu = new App.CanvasPaneMenuView;
		this.edit = new App.CanvasEditView;

		$(this.el)
			.append(this.menu.el)
			.append(this.edit.el);
	}

});