App.Layers = Backbone.Collection.extend({
	model: App.Layer,

	nextOrderId: function() {
		return !this.length ? 1 : this.last().get('orderId')+1;
	},

	resetSelected: function() {
		this.each(function(layer) {
			layer.set('selected', false);
		})
	},

	moveUp: function(layer) {
		var curIndex = this.indexOf(layer);
		this.swap(layer, this.at(curIndex+1));
	},

	moveDown: function(layer) {
		var curIndex = this.indexOf(layer);
		this.swap(layer, this.at(curIndex-1));
	},

	swap: function(first, second) {
		Utils.c.log(first.get('orderId'), second.get('orderId'));
		var temp = first.get('orderId');
		first.set('orderId', second.get('orderId'));
		second.set('orderId', temp);
		Utils.c.log(first.get('orderId'), second.get('orderId'));
		this.sort({silent: true});
		this.trigger('changed');
	},

	comparator: function(layer) {
		return layer.get('orderId');
	}

});