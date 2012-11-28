App.Layer = Backbone.Model.extend({

	defaults: {
		name: "New Layer",
		orderId: 0,
		type: 'squares',
		instructions: {},
		selected: false,
		visible: false
	},

	initialize: function() {
		var orderId = App._layers.nextOrderId();
		this.set('instructions', { // Bug. Setting them as defaults doesn't work. 
															 // Nested attrs is poor practice, anyway
			diamond: {
				radius: 5,
				hspacing: 0,
				vspacing: 0,
				opacity: 0.2
			},
			circles: {
				radius: 5,
				hspacing: 0,
				vspacing: 0,
				opacity: 0.4
			},
			squares: {
				radius: 10,
				hspacing: 0,
				vspacing: 0,
				stagger: 0,
				opacity: 1.0
			}

		});
		this.set('orderId', orderId);
		this.set('name', "Layer "+orderId);
		this.set('type', Math.random() > 0.5 ? 'circles' : 'squares');

		if (orderId === 1) {
			this.toggleVisible();
			this.setSelected();
		}
	},

	notice: function(model, changed) {
		Utils.c.log(changed, "----> MODEL CHANGED!!!!!!!!!!!");
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