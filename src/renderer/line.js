/**
 * @preserve Copyright (c) 2011, Darafei Praliaskouski, Vladimir Agafonkin, Maksim Gurtovenko
 * Kothic JS is a full-featured JavaScript map rendering engine using HTML5 Canvas.
 * See http://github.com/kothic/kothic-js for more information.
 */

Kothic.line = (function() {
	function renderCasing(ctx, feature, nextFeature, ws, hs, granularity) {
		var style = feature.style,
				nextStyle = nextFeature && nextFeature.style;

		var dashes = style["casing-dashes"] || style.dashes || false;

		if (!this.pathOpened) {
			this.pathOpened = true;
			ctx.beginPath();
		}
		Kothic.path(ctx, feature, dashes, false, ws, hs, granularity);

		if (nextFeature &&
				(nextStyle.width == style.width) &&
				(nextStyle['casing-width'] == style['casing-width']) &&
				(nextStyle['casing-color'] == style['casing-color']) &&
				((nextStyle['casing-dashes'] || nextStyle['dashes'] || false) == (style['casing-dashes'] || style['dashes'] || false)) &&
				((nextStyle['casing-linecap'] || nextStyle['linecap'] || "butt") == (style['casing-linecap'] || style['linecap'] || "butt")) &&
				((nextStyle['casing-linejoin'] || nextStyle['linejoin'] || "round") == (style['casing-linejoin'] || style['linejoin'] || "round")) &&
				((nextStyle['casing-opacity'] || nextStyle['opacity']) == (style['opacity'] || style['casing-opacity']))) return;

		Kothic.style.setStyles(ctx, {
					lineWidth: 2 * style["casing-width"] + ("width" in style ? style["width"] : 0),
					strokeStyle: style["casing-color"] || "#000000",
					lineCap: style["casing-linecap"] || style.linecap || "butt",
					lineJoin: style["casing-linejoin"] || style.linejoin || "round",
					globalAlpha: style["casing-opacity"] || 1
				});

		this.pathOpened = false;
		ctx.stroke();

	}

	function renderPolyline(ctx, feature, nextFeature, ws, hs, granularity) {
		var style = feature.style,
				nextStyle = nextFeature && nextFeature.style;

		var dashes = style.dashes;

		if (!this.pathOpened) {
			this.pathOpened = true;
			ctx.beginPath();
		}
		Kothic.path(ctx, feature, dashes, false, ws, hs, granularity);

		if (nextFeature &&
				((nextStyle.width || 1) == (style.width || 1)) &&
				((nextStyle.color || "#000000") == (style.color || "#000000")) &&
				(nextStyle.linecap == style.linecap) &&
				(nextStyle.linejoin == style.linejoin) &&
				(nextStyle.image == style.image) &&
				(nextStyle.opacity == style.opacity)) return;

		if (('color' in style) || !('image' in style)) {
			Kothic.style.setStyles(ctx, {
						lineWidth: style.width || 1,
						strokeStyle: style.color || '#000000',
						lineCap: style.linecap || "round",
						lineJoin: style.linejoin || "round",
						globalAlpha: style.opacity || 1
					});
			ctx.stroke();
		}


		if ('image' in style) {
			// second pass fills with texture
			var image = MapCSS.getImage(style['image']);
			if (image) {
				Kothic.style.setStyles(ctx, {
							strokeStyle: ctx.createPattern(image, 'repeat') || "#000000",
							lineWidth: style.width || 1,
							lineCap: style.linecap || "round",
							lineJoin: style.linejoin || "round",
							globalAlpha: style.opacity || 1
						});
				ctx.stroke();
			}

		}
		this.pathOpened = false;
	}

	return {
		pathOpened: false,
		renderCasing: renderCasing,
		render: renderPolyline
	};

})();
