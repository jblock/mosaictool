App.Layer = Backbone.Model.extend({
	defaults: {
		name: "New Layer",
		orderId: 0,
		shapes: [],
		selected: false
	},
	initialize: function() {
		this.set('orderId', App._layers.nextOrderId());
		this.set('name', "Layer "+this.get('orderId'));
	},

	clear: function() {
		this.destroy();
	}
});