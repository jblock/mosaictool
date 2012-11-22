App.LayerListItemView = Backbone.View.extend({
	className: 'layer',
	events: {
		'keydown .name': 'updateName'
	},

	initialize: function() {
		this.model.bind('destroy', this.remove, this);
		this.render();
	},

	render: function() {
		$(this.el).html(JST['layers/layer']({
			name: this.model.get('name')
		}));
	},

	updateName: function(e) {
		if (e.keyCode === 13) {
			this.$('.name').blur();
			this.model.set('name', this.$('.name').html());
		}
	},

	remove: function() {
		
	}
});