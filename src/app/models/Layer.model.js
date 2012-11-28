App.Layer = Backbone.Model.extend({

	defaults: {
		name: "New Layer",
		orderId: 0,
		type: 'squares',
		instructions: {
			diamond: {
				radius: 5,
				hspacing: 0,
				vspacing: 0,
				opacity: 0.6
			},
			circles: {
				radius: 5,
				hspacing: 0,
				vspacing: 0,
				opacity: 0.6
			},
			squares: {
				radius: 10,
				hspacing: 0,
				vspacing: 0,
				stagger: 0,
				opacity: 0.6
			}
		},
		selected: false,
		visible: false
	},

	initialize: function() {
		var orderId = App._layers.nextOrderId();

		this.set('orderId', orderId);
		this.set('name', "Layer "+this.get('orderId'));

		if (orderId === 1) {
			this.set('selected', true);
			this.set('visible', true);
		}

	},

	clear: function() {
		this.destroy();
	},

	toggleVisible: function() {
		this.set('visible', !this.get('visible'));
	},

	setSelected: function() {
		this.set('selected', true);
	}

});