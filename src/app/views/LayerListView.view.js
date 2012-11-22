App.LayerListView = Backbone.View.extend({

	id: "layers",

	initialize: function() {
		App._layers.bind('add',this.addLayer,this);
		this.render();
	},

	render: function() {
		console.log("Rendered LayerListView");
	},

	addLayer: function(layer) {
		var listItem = new App.LayerListItemView({model: layer});
		$(this.el).append(listItem.el);
	}

});