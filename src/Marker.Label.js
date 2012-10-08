L.Marker.Label = L.Marker.extend({
	updateLabel: function (text) {
		this.options.icon.updateLabel(this._icon, text);
	},

	_initIcon: function () {
		if (!(this.options.icon instanceof L.Icon.Label)) {
			throw new Error('Icon must be an instance of L.Icon.Label.');
		}

		// Ensure that the label is hidden to begin with
		if (this.options.revealing) {
			this.options.icon.setLabelAsHidden();
		}

		L.Marker.prototype._initIcon.call(this);
	},

	_removeIcon: function () {
		if (this.options.revealing) {
			L.DomEvent
				.off(this._icon, 'mouseover', this._showLabel)
				.off(this._icon, 'mouseout', this._hideLabel);
		}

		L.Marker.prototype._removeIcon.call(this);
	},

	_initInteraction: function () {
		L.Marker.prototype._initInteraction.call(this);

		if (!this.options.revealing) {
			return;
		}

		L.DomEvent
			.on(this._icon, 'mouseover', this._showLabel, this)
			.on(this._icon, 'mouseout', this._hideLabel, this);
	},

	_showLabel: function () {
		this.options.icon.showLabel(this._icon);
	},

	_hideLabel: function () {
		this.options.icon.hideLabel(this._icon);
	}
});