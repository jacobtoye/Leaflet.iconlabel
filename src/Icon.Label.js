L.Icon.Label = L.Icon.extend({
	options: {
		/*
		labelAnchor: (Point) (top left position of the label within the wrapper, default is right)
		wrapperAnchor: (Point) (position of icon and label relative to Lat/Lng)
		iconAnchor: (Point) (top left position of icon within wrapper)
		labelText: (String) (label's text component, if this is null the element will not be created)
		*/
		/* Icon options:
		iconUrl: (String) (required)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default if size is specified, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (Point) (no shadow by default)
		shadowSize: (Point)
		*/
		labelClassName: ''
	},
	
	initialize: function (options) {
		L.Util.setOptions(this, options);
		L.Icon.prototype.initialize.call(this, this.options);
	},

	setLabelAsHidden: function () {
		this._labelHidden = true;
	},

	createIcon: function () {
		return this._createLabel(L.Icon.prototype.createIcon.call(this));
	},
	
	createShadow: function () {
		if (!this.options.shadowUrl) {
			return null;
		}
		var shadow = L.Icon.prototype.createShadow.call(this);
		//need to reposition the shadow
		if (shadow) {
			shadow.style.marginLeft = (-this.options.wrapperAnchor.x) + 'px';
			shadow.style.marginTop = (-this.options.wrapperAnchor.y) + 'px';
		}
		return shadow;
	},

	updateLabel: function (icon, text) {
		if (icon.nodeName.toUpperCase() === 'DIV') {
			icon.childNodes[1].innerHTML = text;
			
			this.options.labelText = text;
		}
	},

	showLabel: function (icon) {
		if (!this._labelTextIsSet()) {
			return;
		}

		icon.childNodes[1].style.display = 'block';
	},

	hideLabel: function (icon) {
		if (!this._labelTextIsSet()) {
			return;
		}

		icon.childNodes[1].style.display = 'none';
	},

	_createLabel: function (img) {
		if (!this._labelTextIsSet()) {
			return img;
		}

		var wrapper = document.createElement('div'),
			label = document.createElement('span');

		// set up wrapper anchor
		wrapper.style.marginLeft = (-this.options.wrapperAnchor.x) + 'px';
		wrapper.style.marginTop = (-this.options.wrapperAnchor.y) + 'px';

		wrapper.className = 'leaflet-marker-icon-wrapper leaflet-zoom-animated';

		// set up label
		label.className = 'leaflet-marker-iconlabel ' + this.options.labelClassName;

		label.innerHTML = this.options.labelText;

		label.style.marginLeft = this.options.labelAnchor.x + 'px';
		label.style.marginTop = this.options.labelAnchor.y + 'px';

		if (this._labelHidden) {
			label.style.display = 'none';
			// Ensure that the pointer cursor shows
			img.style.cursor = 'pointer';
		}
		
		//reset icons margins (as super makes them -ve)
		img.style.marginLeft = this.options.iconAnchor.x + 'px';
		img.style.marginTop = this.options.iconAnchor.y + 'px';
		
		wrapper.appendChild(img);
		wrapper.appendChild(label);

		return wrapper;
	},
	
	_labelTextIsSet: function () {
		return typeof this.options.labelText !== 'undefined' && this.options.labelText !== null;
	}
});