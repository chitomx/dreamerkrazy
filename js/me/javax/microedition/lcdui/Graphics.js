js2me.createClass({
	construct: function (canvas) {
		this.element = canvas;
		this.context = canvas.getContext('2d');
		this.context.textBaseline = 'top';
		this.$setColor$III$V(0, 0, 0);
		this.$setClip$IIII$V(0, 0, this.element.width, this.element.height);
		this.translateX = 0;
		this.translateY = 0;
	},
	$HCENTERI: 1,
	$VCENTERI: 2,
	$LEFTI: 4,
	$RIGHTI: 8,
	$TOPI: 16,
	$BOTTOMI: 32,
	$BASELINEI: 64,
	$SOLIDI: 0,
	$DOTTEDI: 1,
	$setColor$III$V: function (r, g, b) {
		this.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	},
	$setColor$I$V: function (rgb) {
		var red = (rgb & 0xff0000) >> 16;
		var green = (rgb & 0x00ff00) >> 8;
		var blue = (rgb & 0x0000ff);
		this.$setColor$III$V(red, green, blue);
	},
	$fillRect$IIII$V: function (x, y, width, height) {
		this.loadContext();
		if (width == 0) {
			width = 1;
		}
		if (height == 0) {
			height = 1;
		}
		this.context.fillRect(x, y, width, height);
		this.context.restore();
	},
	$drawRect$IIII$V: function (x, y, width, height) {
		this.loadContext();
		if (width == 0) {
			width = 1;
		}
		if (height == 0) {
			height = 1;
		}
		this.context.strokeRect(x, y, width, height);
		this.context.restore();
	},
	$drawRoundRect$IIIIII$V: function (x, y, width, height, arcWidth, arcHeight) {
		this.loadContext();
		this.drawRoundRectPath(x, y, width, height, arcWidth, arcHeight);
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	},
	$fillRoundRect$IIIIII$V: function (x, y, width, height, arcWidth, arcHeight) {
		this.loadContext();
		this.drawRoundRectPath(x, y, width, height, arcWidth, arcHeight);
		this.context.fill();
		this.context.closePath();
		this.context.restore();
	},
	$drawLine$IIII$V: function (x1, y1, x2, y2) {
		this.loadContext();
		this.context.beginPath();
		if (x1 > x2) {
			x1++;
		}
		if (x2 > x1) {
			x2++;
		}
		if (y1 > y2) {
			y1++;
		}
		if (y2 > y1) {
			y1++;
		}
		if (y2 == y1 && x1 == x2) {
			x2++;
			y2++;
		}
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	},
	$drawChar$CIII$V: function (char, x, y, anchor) {
		var str = new javaRoot.$java.$lang.$String(String.fromCharCode(char));
		this.$drawString$Ljava_lang_String_III$V(str, x, y, anchor);
	},
	$drawChars$_CIIIII$V: function (data, offset, length, x, y, anchor) {
		var str = javaRoot.$java.$lang.$String.prototype.$valueOf$_CII$Ljava_lang_String_(data, offset, length);
		this.$drawString$Ljava_lang_String_III$V(str, x, y, anchor);
	},
	$drawArc$IIIIII$V: function (x, y, width, height, startAngle, arcAngle) {
		this.loadContext();
		this.drawArcPath(x, y, width, height, startAngle, arcAngle);
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	},
	$fillArc$IIIIII$V: function (x, y, width, height, startAngle, arcAngle) {
		this.loadContext();
		this.drawArcPath(x, y, width, height, startAngle, arcAngle);
		this.context.fill();
		this.context.closePath();
		this.context.restore();
	},
	$setFont$Ljavax_microedition_lcdui_Font_$V: function (font) {
		this.font = font.getCSS();;
	},
	$drawString$Ljava_lang_String_III$V: function (str, x, y, anchor) {
		this.loadContext();
		if (anchor == 0) {
			anchor = this.$TOPI | this.$LEFTI;
		}
		if (anchor & this.$TOPI) {
			this.context.textBaseline = 'top';
		}
		if (anchor & this.$VCENTERI) {
			this.context.textBaseline = 'middle';
		}
		if (anchor & this.$BASELINEI) {
			this.context.textBaseline = 'alphabetic';
		}
		if (anchor & this.$BOTTOMI) {
			this.context.textBaseline = 'bottom';
		}
		if (anchor & this.$HCENTERI) {
			x -= this.context.measureText(str.text).width / 2;
		}
		if (anchor & this.$RIGHTI) {
			x -= this.context.measureText(str.text).width;
		}
		this.context.fillText(str.text, x, y);
		this.context.restore();
	},
	$drawImage$Ljavax_microedition_lcdui_Image_III$V: function (img, x, y, anchor) {
		this.loadContext();
		if (anchor == 0) {
			anchor = this.$TOPI | this.$LEFTI;
		}
		if (anchor & this.$VCENTERI) {
			y -= img.element.height / 2;
		}
		if (anchor & this.$BASELINEI) {
			console.log('baseline,  what to do?');
		}
		if (anchor & this.$RIGHTI) {
			x -= img.element.width;
		}
		if (anchor & this.$HCENTERI) {
			x -= img.element.width / 2;
		}
		if (anchor & this.$BOTTOMI) {
			y -= img.element.height;
		}
		this.context.drawImage(img.element, x, y);
		this.context.restore();
	},
	$clipRect$IIII$V: function (x, y, width, height) {
		var clipX = Math.max(x, this.clipX);
		var clipY = Math.max(y, this.clipY);
		var clipWidth = Math.min(x + width, this.clipX + this.clipWidth) - clipX;
		var clipHeight = Math.min(y + height, this.clipY + this.clipHeight) - clipY;
		this.$setClip$IIII$V(clipX, clipY, clipWidth, clipHeight);
	},
	$setClip$IIII$V: function (x, y, width, height) {
		if (width < 0) {
			width = 0;
		}
		if (height < 0) {
			height = 0;
		}
		this.clipX = x;
		this.clipY = y;
		this.clipWidth = width;
		this.clipHeight = height;
		this.context.restore();
		this.context.save();
		this.context.translate(this.translateX, this.translateY);
		this.context.beginPath();
		this.context.rect(x, y, width, height);
		this.context.clip();
		this.context.closePath();
		this.context.translate(-this.translateX, -this.translateY);
	},
	$getClipX$$I: function () {
		return this.clipX + this.translateX;
	},
	$getClipY$$I: function () {
		return this.clipY + this.translateY;
	},
	$getClipWidth$$I: function () {
		return this.clipWidth;
	},
	$getClipHeight$$I: function () {
		return this.clipHeight;
	},
	$drawRegion$Ljavax_microedition_lcdui_Image_IIIIIIII$V: function(src, sx, sy, width, height, transform, dx, dy, anchor) {
		this.loadContext();
		var dw = width;
		var dh = height;
		if (transform >= 4) {
			var dh = width;
			var dw = height;
		}
		if (anchor & this.$VCENTERI) {
			dy -= dh / 2;
		}
		if (anchor & this.$BASELINEI) {
			console.log('baseline,  what to do?');
		}
		if (anchor & this.$RIGHTI) {
			dx -= dw;
		}
		if (anchor & this.$HCENTERI) {
			dx -= dw / 2;
		}
		if (anchor & this.$BOTTOMI) {
			dy -= dh;
		}
		this.context.translate(dx + dw / 2, dy + dh / 2);
		var sprite = javaRoot.$javax.$microedition.$lcdui.$game.$Sprite.prototype;
		if (transform == sprite.$TRANS_ROT90I || transform == sprite.$TRANS_MIRROR_ROT90I) {
			this.context.rotate(Math.PI / 2);
		}
		if (transform == sprite.$TRANS_ROT180I || transform == sprite.$TRANS_MIRROR_ROT180I) {
			this.context.rotate(Math.PI);
		}
		if (transform == sprite.$TRANS_ROT270I || transform == sprite.$TRANS_MIRROR_ROT270I) {
			this.context.rotate(3 * Math.PI / 2);
		}
		if (transform == sprite.$TRANS_MIRRORI || transform == sprite.$TRANS_MIRROR_ROT180I) {
			this.context.scale(-1, 1);
		}
		if (transform == sprite.$TRANS_MIRROR_ROT90I || transform == sprite.$TRANS_MIRROR_ROT270I) {
			this.context.scale(1, -1);
		}
		this.context.drawImage(src.element, sx, sy, width, height, -dw / 2, -dh / 2, dw, dh);
		this.context.restore();
	},
	$getTranslateX$$I: function () {
		return this.translateX;
	},
	$getTranslateY$$I: function () {
		return this.translateY;
	},
	$translate$II$V: function (x, y) {
		this.translateX += x;
		this.translateY += y;
	},
	$setStrokeStyle$I$V: function (style) {
		this.style = style;
	},
	// FML, it only exists because of stupid canvas clip
	loadContext: function () {
		this.context.save();
		if (this.style == this.$DOTTEDI) {
			this.context.mozDash = [2];
		} else {
			this.context.mozDash = null;
		}
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.color;
		this.context.font = this.font;
		this.context.translate(this.translateX, this.translateY);
	},
	drawArcPath: function (x, y, width, height, startAngle, arcAngle) {
        this.context.beginPath();
        this.context.translate(x - width / 2, y - height / 2);
        if (width != 0 && height != 0) {
			this.context.scale(width, height);
		}
        this.context.arc(1, 1, 1, (startAngle / 180) * Math.PI, ((startAngle + arcAngle) / 180) * Math.PI, true);
	},
	drawRoundRectPath: function (x, y, width, height, arcWidth, arcHeight) {
		this.context.beginPath();
		this.context.moveTo(x + arcWidth, y);
		this.context.lineTo(x + width - arcWidth, y);
		this.context.quadraticCurveTo(x + width, y, x + width, y + arcHeight);
		this.context.lineTo(x +  width, y + height - arcHeight);
		this.context.quadraticCurveTo(x + width, y + height, x + width - arcWidth, y + height);
		this.context.lineTo(x + arcWidth, y + height);
		this.context.quadraticCurveTo(x, y + height, x, y + height - arcHeight);
		this.context.lineTo(x, y + arcHeight);
		this.context.quadraticCurveTo(x, y, x + arcWidth, y);
	}
});
