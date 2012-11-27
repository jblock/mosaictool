App.AppView = Backbone.View.extend({

	className: "app",
	el: "body",

	initialize: function() {
		this.img = new App.ImageSource;
		this.img.bind('change', this.changedImage, this);
		App._layers.bind('change', this.changedLayers, this);

		this.layerList = new App.LayerListView;
		this.layerListOptions = new App.LayerListOptionsView;
		this.canvasView = new App.CanvasView({model: this.img});

		this.render();
	},

	events: {
		'click a.createNewLayer': 'makeNewLayer'
	},

	render: function() {
		$(this.el).html(JST['main']());
		Utils.c.log("AppView Rendered");

		this.layerList.setElement($('#layers')).render();
		this.layerListOptions.setElement($('#mainMenu')).render();

		this.img.on('img:loaded',this.buildCanvas,this);
	},

	makeNewLayer: function() {
		var layer = new App.Layer;
		App._layers.add(layer);
		if (App._layers.size() === 1) {
			App._layers.trigger('selected:layer', layer);
		}
	},

	changedLayers: function(layer) {
		// Utils.c.log(App._layers.getSelected());
	},

	changedImage: function(imageSource) {

	},

	buildCanvas: function() {
		Utils.c.log("Trigger received. image loaded.");
		this.canvasView.setElement($('#canvasPane')).render();
		this.makeNewLayer();
	}

});