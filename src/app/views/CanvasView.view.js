App.CanvasView = Backbone.View.extend({

	// id: 'canvasPane',

	initialize: function() {
		Utils.c.log('initialized CanvasView');
		_.bindAll(this, 'makeMenu');
		App._layers.on('selected:layer changed:type', this.makeMenu);
		this.menu = new App.CanvasPaneMenuView();;
		this.edit = new App.CanvasEditView({model: this.model});
		// this.render();
	},

	render: function() {
		Utils.c.log("rendered canvasView");
		this.$el.html(JST['canvas']());

		this.edit.setDimensions(this.$el.width(),this.$el.height());
		this.menu.setElement($('#canvasMenu'));
		this.edit.setElement($('#mainCanvas')).render();

		return this;
	},

	makeMenu: function(layer) {
		this.menu.render(layer);
	}

});