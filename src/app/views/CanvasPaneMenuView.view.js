App.CanvasPaneMenuView = Backbone.View.extend({

	events: {
		'change #type': 'adjustLayer',
		'change input': 'adjustLayer'
	},

	initialize: function() {
		_.bindAll(this, 'adjustLayer');
	},

	render: function(layer) {
		this.$el.empty();
		this.model = layer;
		switch (this.model.get('type'))
		{
			case 'diamond':
				this.$el.html(JST['canvas/menu/diamond']({
					instructions: this.model.get('instructions').diamond
				}));
				break;
			case 'circles':
				this.$el.html(JST['canvas/menu/circles']({
					instructions: this.model.get('instructions').circles
				}));
				break;
			case 'squares':
				this.$el.html(JST['canvas/menu/squares']({
					instructions: this.model.get('instructions').squares
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
			App._layers.trigger('changed:type', this.model);
		} else {
			this.model.get('instructions')[type][prop] = parseFloat(val);
			App._layers.trigger('changed');
		}
	}

});