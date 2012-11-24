App.CanvasView = Backbone.View.extend({

	// id: 'canvasPane',

	initialize: function() {
		Utils.c.log('initialized CanvasView');
		this.menu = new App.CanvasPaneMenuView({model: this.model});
		this.edit = new App.CanvasEditView({model: this.model});
		// this.render();
	},

	render: function() {
		this.$el.html(JST['canvas']());

		this.edit.setDimensions(this.$el.width(),this.$el.height());

		this.menu.setElement($('#canvasMenu')).render();
		this.edit.setElement($('#mainCanvas')).render();

		return this;

	}

});