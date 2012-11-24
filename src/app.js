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
	'<div class="layer-inner"><a href="#" class="deleteLayer" /><span contenteditable="false" class="name"><%= name %></span></div>'
);

window.JST['canvas'] = _.template(
	'<div id="canvasMenu"></div><div id="mainCanvas"></div>'
);

window.JST['canvas/menu'] = _.template(
	'<a href="#" class="something">Something</a> <a href="#" class="other">Something</a>' 
);

window.JST['canvas/edit'] = _.template(
	'<canvas id="shapeCanvas"></canvas><canvas id="imageSource"></canvas>'
);