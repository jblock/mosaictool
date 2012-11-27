App.ImageTool = (function() {

	function ImageTool(canvas, model) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.image = model;
		this.imageData = this.image.getImageData();
		window['test'] = this;
		Utils.c.log(this);
	}

	ImageTool.prototype.round = function(num) {
		var rounded = (0.5 + num) | 0;
		rounded = ~~ (0.5 + num);
		return (0.5 + num) << 0;   
	}

	ImageTool.prototype.draw = function() {
		Utils.c.log("--> ImageTool Redraw");
		this.ctx.drawImage(this.image.get('img'),0,0,this.canvas.width, this.canvas.height);		
		var _self = this;
		App._layers.each(function(layer) {
			if (layer.get('visible')) {
				switch(layer.get('type')) {
					case "diamond":
						var cenX, cenY, disp,
								radius = layer.get('instructions').diamond.radius,
								hs = layer.get('instructions').diamond.spacing.horizontal,
								vs = layer.get('instructions').diamond.spacing.vertical,
								op = layer.get('instructions').diamond.opacity,
								numH = _self.canvas.width / (radius + hs),
								numV = _self.canvas.height / (2 * radius + vs);

						for (var i = 0; i <= numH; i++) {
							for (var j = 0; j <= numV; j++) {
								disp = i % 2 === 0 ? radius : 0;
								cenX = _self.round(i*(radius+hs));
								cenY = _self.round(disp+2*j*(radius+vs));
								_self.ctx.fillStyle = _self.getChunkColor(cenX, cenY, op);
								_self.ctx.beginPath();
								_self.ctx.moveTo(cenX, cenY - radius);
								_self.ctx.lineTo(cenX + radius, cenY);
								_self.ctx.lineTo(cenX, cenY + radius);
								_self.ctx.lineTo(cenX - radius, cenY);
								_self.ctx.closePath();
								_self.ctx.fill();
							}
						}
						break;
				}
			}
		});
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