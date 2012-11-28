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
	'<div class="layer-inner"><a href="#" class="layerButton deleteLayer" /><a href="#" class="layerButton toggleVisible" /><a href="#" class="layerButton moveUp" /><a href="#" class="layerButton moveDown" /><span contenteditable="false" class="name"><%= name %></span></div>'
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
	'<option value="diamond" selected>diamond</option><option value="circles">circles</option><option value="squares">squares</option></select>'+
	'<div class="paramGroup"><label for="opacity">Opacity: </label><input id="opacity" value="<%= opacity %>" type="text"/ ></div>'+
	'<div class="paramGroup"><label for="radius">Radius: </label><input id="radius" value="<%= radius %>" type="text"/ ></div>'+
	'<div class="paramGroup"><label for="hspacing">Horiz. Spacing: </label><input id="hspacing" value="<%= hspacing %>" type="text"/ ></div>'+
	'<div class="paramGroup"><label for="vspacing">Vert. Spacing: </label><input id="vspacing" value="<%= vspacing %>" type="text"/ ></div>'
);

window.JST['canvas/menu/circles'] = _.template(
	'<select id="type">'+
	'<option value="diamond">diamond</option><option value="circles" selected>circles</option><option value="squares">squares</option></select>'+
	'<div class="paramGroup"><label for="opacity">Opacity: </label><input id="opacity" value="<%= opacity %>" type="text"></input></div>'+
	'<div class="paramGroup"><label for="radius">Radius: </label><input id="radius" value="<%= radius %>" type="text"></input></div>'+
	'<div class="paramGroup"><label for="hspacing">Horiz. Spacing: </label><input id="hspacing" value="<%= hspacing %>" type="text"></input></div>'+
	'<div class="paramGroup"><label for="vspacing">Vert. Spacing: </label><input id="vspacing" value="<%= vspacing %>" type="text"></input></div>'
);

window.JST['canvas/menu/squares'] = _.template(
	'<select id="type"><option value="diamond">diamond</option><option value="circles">circles</option><option value="squares" selected>squares</option></select>'+
	'<div class="paramGroup"><label for="opacity">Opacity: </label><input id="opacity" value="<%= opacity %>" type="text"></input></div>'+
	'<div class="paramGroup"><label for="radius">Radius: </label><input id="radius" value="<%= radius %>" type="text"></input></div>'+
	'<div class="paramGroup"><label for="hspacing">Horiz. Spacing: </label><input id="hspacing" value="<%= hspacing %>" type="text"></input></div>'+
	'<div class="paramGroup"><label for="vspacing">Vert. Spacing: </label><input id="vspacing" value="<%= vspacing %>" type="text"></input></div>'
);