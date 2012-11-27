App.Layer = Backbone.Model.extend({

	defaults: {
		name: "New Layer",
		orderId: 0,
		type: 'diamond',
		instructions: {
			diamond: {
				radius: 5,
				spacing: {
					horizontal: 0,
					vertical: 0
				},
				opacity: 0.6
			},
			circles: {
				radius: 5,
				spacing: {
					horizontal: 0,
					vertical: 0
				},
				opacity: 1.0
			},
			squares: {
				side: 10,
				spacing: {
					horizontal: 0,
					vertical: 0
				},
				stagger: 0,
				opacity: 1.0
			}
		},
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