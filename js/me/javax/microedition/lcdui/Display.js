js2me.createClass({
	$getDisplay$Ljavax_microedition_midlet_MIDlet_$Ljavax_microedition_lcdui_Display_: function (midlet) {
		if (!midlet.display) {
			midlet.display = new javaRoot.$javax.$microedition.$lcdui.$Display();
			var element = document.getElementById('screen');
			midlet.display.element = element;
		}
		return midlet.display;
	},
	$setCurrent$Ljavax_microedition_lcdui_Displayable_$V: function (displayable) {
		clearTimeout(this.timeout);
		var screen = this.element;
		if (this.current) {
			this.current.active = false;
		}
		this.current = displayable;
		displayable.display = this;
		this.timeout = setTimeout(function () {
			if (displayable.title) {
				document.getElementById('title').innerHTML = displayable.title.text;
			}
			screen.innerHTML = '';
			screen.appendChild(displayable.element);
			displayable.active = true;
			
			displayable.refreshCommands();
		}, 1);
	},
	$callSerially$Ljava_lang_Runnable_$V: function (r) {
		a = 1;
		setTimeout(function () {
			r.$run$$V();
		}, 1);
	},
	$getCurrent$$Ljavax_microedition_lcdui_Displayable_: function () {
		return this.current;
	},
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Display'
});