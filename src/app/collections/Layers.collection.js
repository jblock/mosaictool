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
		var temp = first.get('orderId');
		first.set('orderId', second.get('orderId'), {silent: true});
		second.set('orderId', temp);
		// this.sort({silent: true});
		// Utils.c.log(this.pluck('orderId'));
		Utils.c.log("-----------> swapped order");
	},

	comparator: function(layer) {
		return layer.get('orderId');
	}

});