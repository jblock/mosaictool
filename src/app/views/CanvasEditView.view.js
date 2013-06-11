App.CanvasEditView = Backbone.View.extend({

	events: {
		// 'mouseover #imageSource': 'createIndicator',
		// 'mousemove #imageSource': 'adjustIndicator',
		// 'mouseout #imageSource': 'clearIndicator',
		'click #imageSource': 'clickedIndicator'
	},

	initialize: function() {
		App.window.bind("resize.canvas", _.bind(_.debounce(this.resize, 200), this));

		this.canvasWidth = 0;
		this.canvasHeight = 0;

		this.indicator = {};
		this.indicator.status = false;
		this.indicator.x = 0;
		this.indicator.y = 0;
	},

	render: function() {
		this.$el.html(JST['canvas/edit']());
		
		this.imageSource = this.$('#imageSource');

		this.imageTool = new App.ImageTool(this.imageSource[0], this.model);

		this.resize();

		App._layers.bind('add', this.draw, this);
		App._layers.bind('remove', this.draw, this);
		App._layers.bind('change', this.draw, this);
		App._layers.on('changed', this.draw, this);
		App._layers.on('output', this.makePng, this);

		return this;
	},

	resize: function() {
		Utils.c.log("resize");

		this.canvasWidth = this.$el.width();
		this.canvasHeight = this.$el.height();

		if (this.canvasWidth > this.canvasHeight) {
			this.canvasWidth = Math.min(this.model.get('_ratio')*this.canvasHeight, this.canvasWidth);
		} 
		this.canvasHeight = Math.min(this.canvasWidth / this.model.get('_ratio'), this.canvasHeight);

		this.imageSource
			.attr({
				'width': this.canvasWidth,
				'height': this.canvasHeight
			})
			.css({
				'marginTop': 0.5*(this.$el.height()-this.canvasHeight),
				'marginLeft': 0.5*(this.$el.width()-this.canvasWidth)
			});

		this.draw();
	},

	setDimensions: function(width, height) {
		this.canvasWidth = width;
		this.canvasHeight = height;
	},

	draw: function() {
		this.imageTool.draw();
		this.imageTool.drawOnscreen();
	},

	makePng: function() {
		this.imageTool.draw(this.model.get('_width'),this.model.get('_height'));
		var basePng = this.imageTool.outputPng();
		// if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		// 	window.open(basePng.replace('image/png', 'image/octet-stream'));
		// } else {
		// 	alert("Check the console for the PNG string!\nPaste it into a non-safari browser. Safari doesn't like it.");
		// 	console.log(basePng);
		// }
		$.ajax({
			url: "/projects/mosaictool/encode.php",
			type: "POST",
			data: {
				img: basePng
			}
		}).done(function(url) {
			window.location.href = App.DOC_ROOT + "download.php?path="+url;
		});
	},

	createIndicator: function() {
		Utils.c.log('Created Indicator');
		this.indicator.status = true;
	},	

	adjustIndicator: function(e) {
		this.indicator.x = e.offsetX;
		this.indicator.y = e.offsetY;
		this.draw();
	},

	clearIndicator: function() {
		Utils.c.log("Cleared Indicator");
		this.indicator.status = false;
		this.draw(); // to clear
	},

	clickedIndicator: function() {
		Utils.c.log("clicked indicator");
	}


});