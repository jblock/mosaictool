App.CanvasEditView = Backbone.View.extend({
	// id: 'mainCanvas',

	initialize: function() {
		App.window.bind("resize.canvas", _.bind(_.debounce(this.resize, 200), this));
		this.canvasWidth = this.$el.width();
		this.canvasHeight = this.$el.height();
	},

	render: function() {
		this.$el.html(JST['canvas/edit']());
		
		this.imageSource = this.$('#imageSource');
		this.ctx = this.imageSource[0].getContext('2d');

		this.imageSource.attr({
			'width': this.canvasWidth,
			'height': this.canvasHeight
		});

		this.draw();

		return this;
	},

	resize: function() {
		Utils.c.log("resize");

		this.canvasWidth = this.$el.width();
		this.canvasHeight = this.$el.height();

		this.imageSource.attr({
			'width': this.canvasWidth,
			'height': this.canvasHeight
		});

		this.draw();
	},

	draw: function() {
		Utils.c.log("drawing");
		this.ctx.drawImage(this.model.get('img'),0,0,this.canvasWidth, this.canvasHeight);
	}
});