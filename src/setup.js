$(function() {

	Utils.c = window.console || function() {};
	App.window = $(window);

	Backbone.emulateJSON = true;

	App._layers = new App.Layers;

	App.main = new App.AppView;

});