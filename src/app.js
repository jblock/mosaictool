window.App = {};
window.Utils = {};
window.JST = {};

window.JST['main'] = _.template(
	'<div id="main">'+
		'<div id="appWindow">'+
			'<div id="leftPane"></div><div id="rightPane"></div>'+
		'</div>'+
	'</div>'
);

window.JST['layers/list/menu'] = _.template(
		'<a href="#" class="createNewLayer">New Layer</a> '+
    '<a href="#" class="deleteSelectedLayer">Delete Layer(s)</a>'
);

window.JST['layers/layer'] = _.template(
	'<span contenteditable="true" class="name"><%= name %></span>'
);