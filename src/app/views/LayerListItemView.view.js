App.LayerListItemView = Backbone.View.extend({
	className: 'layer',
	events: {
		'keydown .name': 'updateName',
		'click .name': 'editName',
		'blur .name': 'finishEditName',
		'click .layer-inner': 'toggleFocus',
		'click .deleteLayer': 'deleteLayer',
		'click .toggleVisible': 'toggleVisible',
		'click .moveDown': 'moveDown',
		'click .moveUp': 'moveUp'
	},

	initialize: function() {
		_.bindAll(this, 'moveUp', 'moveDown');
		this.model.bind('destroy', this.remove, this);
		this.model.bind('change', this.updateDisplay, this);
		this.render();
	},

	render: function() {
		$(this.el).html(JST['layers/layer']({
			name: this.model.get('name')
		}));
		this.updateDisplay();
		return this;
	},

	updateName: function(e) {
		if (e.keyCode === 13) {
			this.$('.name').blur();
			this.model.set('name', this.$('.name').html());
		}
	},

	updateDisplay: function() {
		var classes = ['selected', 'visible'];
		for (var i = 0; i < classes.length; i++) {
			if (this.model.get(classes[i])) {
				$(this.el).addClass(classes[i]);
			} else {
				$(this.el).removeClass(classes[i]);
			}
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
			App._layers.resetSelected(); // TODO chain this call
			this.model.set('selected', true);
			App._layers.trigger('selected:layer', this.model);
		} 
	},

	toggleVisible: function(e) {
		Utils.c.log("Toggled Visible");
		e.stopPropagation();
		this.model.toggleVisible();
	},

	moveUp: function(e) {
		e.stopPropagation();
		if (this.model !== App._layers.last()) {
			this.$el.insertBefore(this.$el.prev());
			App._layers.moveUp(this.model);
		} else {
			Utils.c.log("Top o' the list");
		}
	},

	moveDown: function(e) {
		e.stopPropagation();
		if (this.model !== App._layers.first()) {
			this.$el.insertAfter(this.$el.next());
			App._layers.moveDown(this.model);
		} else {
			Utils.c.log("Bottom o' the list");
		}
	}

});