App.Layer = Backbone.Model.extend({

	defaults: {
		name: "New Layer",
		orderId: 0,
		shapes: [],
		selected: false,
		visible: true
	},

	initialize: function() {
		var orderId = App._layers.nextOrderId();

		this.set('orderId', orderId);
		this.set('name', "Layer "+this.get('orderId'));

		if (orderId === 1) {
			this.set('selected', true);
		}

	},

	clear: function() {
		this.destroy();
	},

	toggleVisible: function() {
		this.set('visible', !this.get('visible'));
	}
	
});