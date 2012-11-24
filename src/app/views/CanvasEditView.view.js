App.CanvasEditView = Backbone.View.extend({

	events: {
		'mouseover #shapeCanvas': 'createIndicator',
		'mousemove #shapeCanvas': 'adjustIndicator',
		'mouseout #shapeCanvas': 'clearIndicator',
		'click #shapeCanvas': 'clickedIndicator'
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
		this.shapeCanvas = this.$('#shapeCanvas');

		this.imageCtx = this.imageSource[0].getContext('2d');
		this.indicatorCtx = this.shapeCanvas[0].getContext('2d');

		this.imageData = this.model.getImageData();


		this.resize();

		// this.drawLoop();

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

		this.imageSource.attr({
			'width': this.canvasWidth,
			'height': this.canvasHeight
		});

		this.shapeCanvas.attr({
			'width': this.canvasWidth,
			'height': this.canvasHeight
		});

		this.draw();
	},

	setDimensions: function(width, height) {
		this.canvasWidth = width;
		this.canvasHeight = height;
	},

	// drawLoop: function() {
	// 	requestAnimationFrame(this.drawLoop.bind(this));
	// 	this.draw();
	// },

	draw: function() {

		this.imageCtx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
		this.indicatorCtx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

		if (this.indicator.status) {
			Utils.c.log("Drawing Indicator");
			this.indicatorCtx.fillStyle = this.getChunkColor(this.indicator.x, this.indicator.y);
			this.indicatorCtx.beginPath();
			this.indicatorCtx.arc(this.indicator.x, this.indicator.y, 40, 0, Math.PI*2, true);
			this.indicatorCtx.fill();
		}

		this.imageCtx.drawImage(this.model.get('img'),0,0,this.canvasWidth, this.canvasHeight);

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
	},

	getChunkColor: function(canvasX, canvasY, alpha) {
		var relX = Math.floor(canvasX / this.canvasWidth * this.model.get('_width')),
			relY = Math.floor(canvasY / this.canvasHeight * this.model.get('_height')),
			red = this.imageData.data[((relY*this.imageData.width*4)+(relX*4))],
			grn = this.imageData.data[((relY*this.imageData.width*4)+(relX*4))+1],
			blu = this.imageData.data[((relY*this.imageData.width*4)+(relX*4))+2],
			str = 'rgb('+red+','+grn+','+blu;

		if (alpha === true) {
			str += ','+this.imageData.data[((relY*this.imageData.width*4)+(relX*4))+3];
		}
		return str += ')';
	}


});