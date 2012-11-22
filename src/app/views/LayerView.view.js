App.LayerView = Backbone.View.extend({
	className: 'layer',
	initialize: function() {
		console.log("new LayerView created");
	},
	render: function() {
		$(this.el).html(JST['layers/layer']({id: 3}));
		return this;
	}
});