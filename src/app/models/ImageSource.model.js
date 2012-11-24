App.ImageSource = Backbone.Model.extend({
	defaults: {
		img: null,
		src: "../assets/images/edinburgh.jpg",
		_width: 0,
		_height: 0,
		_ratio: 1
	},

	initialize: function(url) {
		Utils.c.log("initializing image");
		var _self = this;
		this.set('img', new Image());
		if (url !== undefined) this.set('src', url);
		this.get('img').src = this.get('src');
		this.get('img').onload = function() {
			Utils.c.log("--> Loaded image. Now setting size");
			_self.set('_width', _self.get('img').width);
			_self.set('_height', _self.get('img').height);
			_self.set('_ratio', _self.get('width')/_self.get('height'));
			_self.trigger('img:loaded');
		}
	}
});