App.ImageTool = (function() {

	function ImageTool(canvas, model) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.image = model;
		this.imageData = this.image.getImageData();

		this.buffer = document.createElement('canvas');
		this.bufferCtx = this.buffer.getContext('2d');
	}

	ImageTool.prototype.setBuffer = function(width, height) {
		this.buffer.width = width || this.canvas.width;
		this.buffer.height = height || this.canvas.height;
		this.bufferCtx.clearRect(0,0,this.buffer.width,this.buffer.height);
	}

	ImageTool.prototype.round = function(num) {
		var rounded = (0.5 + num) | 0;
		rounded = ~~ (0.5 + num);
		return (0.5 + num) << 0;   
	}

	ImageTool.prototype.draw = function(width, height) {
		Utils.c.log("--> ImageTool Redraw");
		this.setBuffer(width, height);
		if (!App.hideImage) {
			this.bufferCtx.drawImage(this.image.get('img'),0,0,this.buffer.width, this.buffer.height);		
		}
		var i, j, cenX, cenY, numH, numV, _self = this;
		Utils.c.log(App._layers.pluck('orderId'));
		App._layers.each(function(layer) {
			if (layer.get('visible')) {
				switch(layer.get('type')) {
					case "circles":
						var radius = layer.get('instructions').circles.radius,
								hs = layer.get('instructions').circles.hspacing,
								vs = layer.get('instructions').circles.vspacing;
						numH = _self.buffer.width / (2 * (radius + hs));
						numV = _self.buffer.height / (2 * (radius + vs));
						for (i = 0; i <= numH; i++) {
							for (j = 0; j <= numV; j++) {
								cenX = _self.round(radius+2*i*(radius+hs));
								cenY = _self.round((i % 2 === 0 ? radius : 0)+2*j*(radius+vs));
								_self.drawCircle(cenX, cenY, radius, layer.get('instructions').circles.opacity);
							}
						}
						break;
					case "squares":
						var radius = layer.get('instructions').squares.radius,
								hs = layer.get('instructions').squares.hspacing,
								vs = layer.get('instructions').squares.vspacing,
								stg = layer.get('instructions').squares.stagger;
						numH = _self.buffer.width / (radius + hs);
						numV = _self.buffer.height / (radius + vs);
						for (i = 0; i < numH; i++) {
							for (j = 0; j <= numV; j++) {
								cenX = _self.round(radius/2+i*(radius+hs));
								cenY = _self.round((i % 2 !== 0 ? stg : 0) +radius/2+j*(radius+vs));
								_self.drawSquare(cenX, cenY, radius, layer.get('instructions').squares.opacity);
							}
						}
					break;
					case "diamond":
						var radius = layer.get('instructions').diamond.radius,
								hs = layer.get('instructions').diamond.hspacing,
								vs = layer.get('instructions').diamond.vspacing;
						numH = _self.buffer.width / (radius + hs),
						numV = _self.buffer.height / (2 * (radius + vs));
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
	}

	ImageTool.prototype.drawOnscreen = function() {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.drawImage(this.buffer,0,0);
	}

	ImageTool.prototype.outputPng = function() {
		return this.buffer.toDataURL('image/png');
	}

	ImageTool.prototype.drawSquare = function(cenX, cenY, radius, opacity) {
		this.bufferCtx.fillStyle = this.getChunkColor(cenX, cenY, opacity);
		this.bufferCtx.beginPath();
		this.bufferCtx.fillRect(cenX - radius/2, cenY - radius/2, radius, radius);
		this.bufferCtx.closePath();
		this.bufferCtx.fill();
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
		var relX = Math.floor(canvasX / this.buffer.width * this.image.get('_width')),
			relY = Math.floor(canvasY / this.buffer.height * this.image.get('_height')),
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