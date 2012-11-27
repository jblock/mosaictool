window.App = {};
window.Utils = {};
window.JST = {};

window.JST['main'] = _.template(
	'<div id="main">'+
		'<div id="appWindow">'+
			'<div id="leftPane"><div id="mainMenu"></div><div id="layers"></div></div><div id="rightPane"><div id="canvasPane"></div></div>'+
		'</div>'+
	'</div>'
);

window.JST['layers/list/menu'] = _.template(
	'<a href="#" class="btn createNewLayer">New Layer</a>'
);

window.JST['layers/layer'] = _.template(
	'<div class="layer-inner"><a href="#" class="layerButton deleteLayer" /><a href="#" class="layerButton toggleVisible" /><span contenteditable="false" class="name"><%= name %></span></div>'
);

window.JST['canvas'] = _.template(
	'<div id="canvasMenu"></div><div id="mainCanvas"></div>'
);

window.JST['canvas/menu'] = _.template(
	'<a href="#" class="something">Something</a> <a href="#" class="other">Something</a>' 
);

window.JST['canvas/edit'] = _.template(
	'<canvas id="imageSource"></canvas>'
);

window.JST['canvas/menu/diamond'] = _.template(
	'<select id="type">'+
		'<option value="diamond" selected>diamond</option><option value="circles">circles</option><option value="squares">squares</option>'+
		'</select><label for="opacity">Opacity: </label><input id="opacity" value="<%= opacity %>" type="text"></input>'
);

window.JST['canvas/menu/circles'] = _.template(
	'<select id="type"><option value="diamond">diamond</option><option value="circles" selected>circles</option><option value="squares">squares</option></select>'
);

window.JST['canvas/menu/squares'] = _.template(
	'<select id="type"><option value="diamond">diamond</option><option value="circles">circles</option><option value="squares" selected>squares</option></select>'
);