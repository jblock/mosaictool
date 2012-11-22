App.LayerListOptionsView = Backbone.View.extend({

	id: 'mainMenu',

	initialize: function() {
		this.render();
	},

	render: function() {
		$(this.el).html(JST['layers/list/menu']());
	}
});