$(function() {

	Utils.c = window.console || function() {};

	Backbone.emulateJSON = true;

	App.layers = new App.Layers();

	App.main = new App.AppView;

});