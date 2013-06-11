App.ImageSource = Backbone.Model.extend({
	defaults: {
		img: null,
		src: "/projects/mosaictool/assets/images/2001.jpg",
		_width: 0,
		_height: 0,
		_ratio: 1,
		imgData: null
	},

	initialize: function(url) {
		Utils.c.log("initializing image");
		var _self = this, imgChoices = ['2001.jpg', 'hugo.jpg', 'edinburgh.jpg', 'etv.jpg', '2001-2.jpg'];
		this.set('img', new Image());
		this.set('src', 'assets/images/'+imgChoices[Math.floor(Math.random()*imgChoices.length)])
		if (url !== undefined) this.set('src', url);
		this.get('img').src = this.get('src');
		this.get('img').onload = function() {
			Utils.c.log("--> Loaded image. Now setting size");

			_self.set({
				'_width': this.width,
				'_height': this.height,
				'_ratio': this.width/this.height
			});

			_self.trigger('img:loaded');
		};

	},
	
	getImageData: function() {
		var tempCanvas = $('<canvas width="'+this.get('_width')+'" height="'+this.get('_height')+'" class="invis"></canvas>'), ctx = tempCanvas[0].getContext('2d');

		ctx.drawImage(this.get('img'), 0, 0, this.get('_width'), this.get('_height'));

		return ctx.getImageData(0,0, this.get('_width'), this.get('_height'));
	}
});