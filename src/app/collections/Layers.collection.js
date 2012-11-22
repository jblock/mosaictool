App.Layers = Backbone.Collection.extend({
	model: App.Layer,

	nextOrderId: function() {
		return !this.length ? 1 : this.last().get('orderId')+1;
	}
});