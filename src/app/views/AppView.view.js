App.AppView = Backbone.View.extend({

	className: "app",
	el: "body",

	initialize: function() {

		App.layers.bind('add', this.addLayer);
		App.layers.bind('change', this.drawLayers);

		this.render();
	},

	events: {
		'click a.createNewLayer': 'makeNewLayer'
	},

	render: function() {
		console.log("AppView Rendered");
	},

	makeNewLayer: function() {
		var newView = new App.LayerView();
		newView.render();
		console.log(newView.el);
		$('#layers').append(newView.el);
	}

});