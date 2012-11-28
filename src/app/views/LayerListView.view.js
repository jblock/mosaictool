App.LayerListView = Backbone.View.extend({

	initialize: function() {
		App._layers.bind('add',this.addLayer,this);
	},

	render: function() {
		Utils.c.log("Rendered LayerListView");
		return this;
	},

	addLayer: function(layer) {
		var listItem = new App.LayerListItemView({model: layer});
		$(this.el).prepend(listItem.el);
	}

});