App.AppView = Backbone.View.extend({

	className: "app",
	el: "body",

	initialize: function() {
		App._layers.bind('change', this.changedModel, this);
		this.render();
	},

	events: {
		'click a.createNewLayer': 'makeNewLayer'
	},

	render: function() {
		$(this.el).html(JST['main']());
		Utils.c.log("AppView Rendered");

		this.layerList = new App.LayerListView;
		this.layerListOptions = new App.LayerListOptionsView;

		this.canvasView = new App.CanvasView;

		this.buildLayerList();

		this.buildCanvas();
	},

	makeNewLayer: function() {
		App._layers.add(new App.Layer);
	},

	buildLayerList: function() {
		$('#leftPane')
			.append(this.layerListOptions.el)
			.append(this.layerList.el);
	},

	buildCanvas: function() {
		$('#rightPane')
			.append(this.canvasView.el);
	},

	changedModel: function(layer) {
		
	}

});