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

	swap: function(layer, otherCid) {
		this.move(layer, this.indexOf(this.getByCid(otherCid)));
		Utils.c.log("-----------> swapped order");
		Utils.c.log("-->", this.pluck('name'));
	},

	comparator: function(layer) {
		return layer.get('orderId');
	}

});