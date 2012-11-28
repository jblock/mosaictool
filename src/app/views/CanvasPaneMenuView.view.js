App.CanvasPaneMenuView = Backbone.View.extend({

	events: {
		'change #type': 'adjustLayer',
		'change input': 'adjustLayer'
	},

	initialize: function() {
		_.bindAll(this, 'adjustLayer');
		// Utils.c.log(this.model, App._layers);
		//
	},

	render: function(layer) {
		this.$el.empty();
		if (layer !== undefined) this.model = layer;
		switch (this.model.get('type'))
		{
			case 'diamond':
				this.$el.html(JST['canvas/menu/diamond']({
					opacity: this.model.get('instructions').diamond.opacity,
					radius: this.model.get('instructions').diamond.radius,
					hspacing: this.model.get('instructions').diamond.hspacing,
					vspacing: this.model.get('instructions').diamond.vspacing
				}));
				break;
			case 'circles':
				this.$el.html(JST['canvas/menu/circles']({
					opacity: this.model.get('instructions').circles.opacity,
					radius: this.model.get('instructions').circles.radius,
					hspacing: this.model.get('instructions').circles.hspacing,
					vspacing: this.model.get('instructions').circles.vspacing
				}));
				break;
			case 'squares':
				this.$el.html(JST['canvas/menu/squares']({
					opacity: this.model.get('instructions').squares.opacity,
					radius: this.model.get('instructions').squares.radius,
					hspacing: this.model.get('instructions').squares.hspacing,
					vspacing: this.model.get('instructions').squares.vspacing
				}));
				break;
		}
		Utils.c.log("rendered menu");
		return this;
	},

	adjustLayer: function(e) {
		var prop = e.target.id, 
				val = ($(e.target).val()), 
				type = this.model.get('type');
		if (prop === "type") {
			this.model.set('type',val);
		} else {
			this.model.get('instructions')[type][prop] = parseFloat(val);
		}
		App._layers.trigger('changed');
	}

});