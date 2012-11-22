window.App = {};
window.Utils = {};
window.JST = {};


window.JST['layers/layer'] = _.template(
	'<span contenteditable="true" class="name">Layer <%= id %></span>'
);