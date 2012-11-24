App.CanvasPaneMenuView = Backbone.View.extend({

	// id: 'canvasMenu',

	initialize: function() {

		// this.render();
	},

	render: function() {
		Utils.c.log("rendered menu")
		this.$el.html(JST['canvas/menu']());
		return this;
	}

});