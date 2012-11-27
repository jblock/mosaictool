App.CanvasPaneMenuView = Backbone.View.extend({

	events: {
		'change #type': 'adjustLayer',
		'change #opacity': 'adjustLayer'
	},

	initialize: function() {
		_.bindAll(this, 'adjustLayer');
		// Utils.c.log(this.model, App._layers);
		//
	},

	render: function(layer) {
		this.$el.empty();
		if (layer) this.model = layer;
		switch (this.model.get('type'))
		{
			case 'diamond':
				this.$el.html(JST['canvas/menu/diamond']({
					opacity: this.model.get('instructions').diamond.opacity
				}));
				break;
			case 'circles':
				this.$el.html(JST['canvas/menu/circles']({model: this.model}));
				break;
			case 'squares':
				this.$el.html(JST['canvas/menu/squares']({model: this.model}));
				break;
		}
		Utils.c.log("rendered menu");
		return this;
	},

	adjustLayer: function(e) {
		var prop = ""
		this.model.set(e.target.id,this.$(e.target).val());
		Utils.c.log()
		// this.render();
	}

});