#Leaflet.iconlabel
Adds support for displaying a label to the right of a Leaflet Icon.

##Alternative plugin
[Leaflet.label](https://github.com/leaflet/Leaflet.label) is an alternative plugin that is a little easier to integrate. The only functionality that it does not provide is common events for the label and marker. However it does provide revealing labels for Leaflet paths (Polyline, Polygon, Circle, square etc). 

##Using the plugin
If you are happy with the default icon and label styles, you should be able to use it without any modifications. To create a map marker with a label, declare your marker like:

````
var marker = new L.Marker(
	new L.LatLng(50.5, 30.51),
	{ icon: new L.Icon.Label.Default({ labelText: "A label" }) }
);
````

For a more complete example see [example/map-marker-iconlabels.html](https://github.com/jacobtoye/Leaflet.iconlabel/blob/master/example/map-marker-iconlabels.html)

###Using different icons
See ````L.Icon.Label.Default```` for comments on the positioning of the icon and label. If you wish to use a different sized icon or label you need to edit some of the options. 

E.g. Custom icon (24x24)

````
var SweetIcon = L.Icon.Label.extend({
	options: {
		iconUrl: 'images/icon.png',
		shadowUrl: null,
		iconSize: new L.Point(24, 24),
		iconAnchor: new L.Point(0, 1),
		labelAnchor: new L.Point(26, 0),
		wrapperAnchor: new L.Point(12, 13),
		labelClassName: 'sweet-deal-label'
	}
});
````

See [example/map-marker-iconlabels-custom.html](https://github.com/jacobtoye/Leaflet.iconlabel/blob/master/example/map-marker-iconlabels-custom.html) for complete example.

###Revealing labels
If you would like the labels to initially be hidden and only show on mouseover of the icon, use the L.Marker.Label and set the revealing = true in the marker options.

E.g.

````
var aMarker = new L.Marker.Label(
	[-37.7866, 175.2789],
	{ icon: new L.Icon.Label.Default({ labelText: "A label" }), revealing: true }
);
````

###How to position
Positioning the iconlabel is a little tricky. You need to specify three anchors: the ````wrapperAnchor````, the ````iconAnchor```` and the ````labelAnchor````. These options will determine how the iconlabel is positioned relative to the lat/lng.

#####wrapperAnchor
This is the position of the wrapper div. Use this to position icon + label relative to the Lat/Lng.

#####iconAnchor
This is now the top left position of the icon within the wrapper.

````x = 0```` Icon is to be displayed before the label.<br />
````y = (label height - icon height) / 2```` When the icon height < label height.<br />
````y = 0```` When icon height > label height.

#####labelAnchor
This is the top left position of the label within the wrapper.

````x = icon width + padding between icon and label```` Label is displayed to right of icon.<br />
````y = 0```` When label height > icon height.<br />
````y = (icon height - label height) / 2```` When label height > icon height.

####E.g. Icon height > label height

<img src="https://raw.github.com/jacobtoye/Leaflet.iconlabel/master/eg1.png" alt="E.g. 1" />

Height or icon: 41<br />
Width of icon: 25<br />
Left position of icon point: 13<br />
Padding: 4<br />
Height of label: 26

We want to label to be anchored by the point of the icon.<br />
````wrapperAnchor = new L.Point(13, 41)````

The icon height is greater than the label height.<br />
````iconAnchor = new L.Point(0, 0)````

The label height is less than the icon height.<br />
````iconAnchor = new L.Point(25 + 4, Math.ceil((41-26)/2))```` or ````iconAnchor = new L.Point(29, 8)````
