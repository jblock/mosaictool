App.LayerListOptionsView = Backbone.View.extend({

	events: {
		'click a.createNewLayer': 'makeNewLayer',
		'click a.hideImg': 'hideImg',
		'click a.outputPng': 'outputPng'
	},

	render: function() {
		$(this.el).html(JST['layers/list/menu']());
		return this;
	},

	makeNewLayer: function() {
		var layer = new App.Layer;
		App._layers.add(layer);
		if (App._layers.size() === 1) {
			App._layers.trigger('selected:layer', layer);
		}
	},

	hideImg: function() {
		App.hideImage = !App.hideImage;
		App._layers.trigger('changed');
	},

	outputPng: function() {
		Utils.c.log("Output a PNG");
		App._layers.trigger('output');
	}

});