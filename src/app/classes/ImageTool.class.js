App.ImageTool = (function() {

	function ImageTool(canvas, model) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.image = model;
		this.imageData = this.image.getImageData();

		this.buffer = document.createElement('canvas');
		this.bufferCtx = this.buffer.getContext('2d');
	}

	ImageTool.prototype.setBuffer = function() {
		this.buffer.width = this.canvas.width;
		this.buffer.height = this.canvas.height;
	}

	ImageTool.prototype.round = function(num) {
		var rounded = (0.5 + num) | 0;
		rounded = ~~ (0.5 + num);
		return (0.5 + num) << 0;   
	}

	ImageTool.prototype.draw = function() {
		Utils.c.log("--> ImageTool Redraw");
		this.setBuffer();
		this.bufferCtx.clearRect(0,0,this.buffer.width,this.buffer.height);
		this.bufferCtx.drawImage(this.image.get('img'),0,0,this.canvas.width, this.canvas.height);		
		var i, j, cenX, cenY, numH, numV, _self = this;
		App._layers.each(function(layer) {
			if (layer.get('visible')) {
				switch(layer.get('type')) {
					case "circles":
						var radius = layer.get('instructions').circles.radius,
								hs = layer.get('instructions').circles.spacing.horizontal,
								vs = layer.get('instructions').circles.spacing.vertical;
						numH = _self.canvas.width / (2 * (radius + hs));
						numV = _self.canvas.height / (2 * (radius + vs));
						for (i = 0; i <= numH; i++) {
							for (j = 0; j <= numV; j++) {
								cenX = _self.round(2*i*(radius+hs));
								cenY = _self.round((i % 2 === 0 ? radius : 0)+2*j*(radius+vs));
								_self.drawCircle(cenX, cenY, radius, layer.get('instructions').circles.opacity);
							}
						}
						break;
					case "squares":

					break;
					case "diamond":
						var radius = layer.get('instructions').diamond.radius,
								hs = layer.get('instructions').diamond.spacing.horizontal,
								vs = layer.get('instructions').diamond.spacing.vertical;
						numH = _self.canvas.width / (radius + hs),
						numV = _self.canvas.height / (2 * (radius + vs));

						for (i = 0; i <= numH; i++) {
							for (j = 0; j <= numV; j++) {
								cenX = _self.round(i*(radius+hs));
								cenY = _self.round((i % 2 === 0 ? radius : 0)+2*j*(radius+vs));
								_self.drawDiamond(cenX, cenY, radius, layer.get('instructions').diamond.opacity);
							}
						}

						break;
				}
			}
		});
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.drawImage(this.buffer,0,0);
	}

	ImageTool.prototype.drawCircle = function(cenX, cenY, radius, opacity) {
		this.bufferCtx.fillStyle = this.getChunkColor(cenX, cenY, opacity);
		this.bufferCtx.beginPath();
		this.bufferCtx.arc(cenX, cenY, radius, 0, Math.PI*2, this);
		this.bufferCtx.closePath();
		this.bufferCtx.fill();
	}

	ImageTool.prototype.drawDiamond = function(cenX, cenY, radius, opacity) {
		this.bufferCtx.fillStyle = this.getChunkColor(cenX, cenY, opacity);
		this.bufferCtx.beginPath();
		this.bufferCtx.moveTo(cenX, cenY - radius);
		this.bufferCtx.lineTo(cenX + radius, cenY);
		this.bufferCtx.lineTo(cenX, cenY + radius);
		this.bufferCtx.lineTo(cenX - radius, cenY);
		this.bufferCtx.closePath();
		this.bufferCtx.fill();
	}

	ImageTool.prototype.getChunkColor = function(canvasX, canvasY, alpha) {
		// TODO customize alpha
		var relX = Math.floor(canvasX / this.canvas.width * this.image.get('_width')),
			relY = Math.floor(canvasY / this.canvas.height * this.image.get('_height')),
			red = this.imageData.data[((relY*this.imageData.width*4)+(relX*4))],
			grn = this.imageData.data[((relY*this.imageData.width*4)+(relX*4))+1],
			blu = this.imageData.data[((relY*this.imageData.width*4)+(relX*4))+2],
			color = red+','+grn+','+blu,
			prefix = 'rgb';

		if (alpha !== undefined) {
			prefix += 'a';
			color += ','+alpha;
		}
		prefix += '(' + color + ')';
		return prefix;
	}

	return ImageTool;

})();