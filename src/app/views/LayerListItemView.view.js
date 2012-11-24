App.LayerListItemView = Backbone.View.extend({
	className: 'layer',
	events: {
		'keydown .name': 'updateName',
		'click .name': 'editName',
		'blur .name': 'finishEditName',
		'click .layer-inner': 'toggleFocus',
		'click .deleteLayer': 'deleteLayer'
	},

	initialize: function() {
		this.model.bind('destroy', this.remove, this);
		this.model.bind('change', this.updateDisplay, this);
		this.render();
	},

	render: function() {
		$(this.el).html(JST['layers/layer']({
			name: this.model.get('name')
		}));
		return this;
	},

	updateName: function(e) {
		if (e.keyCode === 13) {
			this.$('.name').blur();
			this.model.set('name', this.$('.name').html());
		}
	},

	updateDisplay: function() {
		if (this.model.get('selected')) {
			$(this.el).addClass('selected');
		} else {
			$(this.el).removeClass('selected');
		}
	},

	deleteLayer: function(e) {
		Utils.c.log("Deleted Layer");
		e.stopPropagation();
		var _self = this;
		$(this.el).slideUp(200,function() {
			_self.model.clear();
		});
	},

	editName: function(e) {
		e.stopPropagation();
		this.$('.name').attr('contenteditable','true').focus()
		this.model.set('name', this.$('.name').html());
		Utils.c.log("edit name");
	},

	finishEditName: function(e) {
		e.stopPropagation();
		this.$('.name').attr('contenteditable','false');
		Utils.c.log("Finished editing model name");
	},

	toggleFocus: function(e) {
		if (!this.model.get('selected')) {
			App._layers.each(function(layer) {
				layer.set('selected',false);
			});
			this.model.set('selected', true);
		} else {
			this.model.set('selected', false);
		}
	}

});