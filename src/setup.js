$(function() {

	Utils.c = window.console || function() {};

	Backbone.emulateJSON = true;

	App._layers = new App.Layers;

	App.main = new App.AppView;

});