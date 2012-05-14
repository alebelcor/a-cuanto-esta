;(function ($, window, undefined) {
	'use strict';

	var App = {},

		o = $({}),

		document = window.document,

		loadRates = function () {
			var dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
				monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
					'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
				annotation$ = $('#annotation');

			annotation$.html('<span>Cargando información... </span>'
				+ '<img src="img/loader.gif" alt="ícono de cargador" title="Cargando...">');

			$.ajax({
				url: 'http://openexchangerates.org/latest.json',
				dataType: 'json',
				cache: false,
				success: function (json) {
					var usdPane$ = $('#usd-pane'),
						eurPane$ = $('#eur-pane'),
						gbpPane$ = $('#gbp-pane'),

						timestamp = new Date(json.timestamp * 1000),

						day = dayNames[timestamp.getDay()],
						month = monthNames[timestamp.getMonth()],
						hours = timestamp.getHours(),
						hoursTranslated = hours > 12 ?
								(hours === 12 ? '12 PM' : (hours - 12) + ' PM') :
								(hours === 0 ? '12 AM' : hours + ' AM'),

						lastUpdate = 'Última actualización: ' + day + ', ' + month + ' '
							+ timestamp.getDate() + ' ' + timestamp.getFullYear() + ', '
							+ hoursTranslated;

					fx.rates = json.rates;
					fx.base = json.base;

					$('<p></p>').html('El precio del dólar es de <strong>$'
						+ fx(1).from('USD').to('MXN').toFixed(4) + '</strong> MXN').appendTo(usdPane$);
					$('<p></p>').text(lastUpdate).appendTo(usdPane$);

					$('<p></p>').html('El precio del euro es de <strong>$'
						+ fx(1).from('EUR').to('MXN').toFixed(4) + '</strong> MXN').appendTo(eurPane$);
					$('<p></p>').text(lastUpdate).appendTo(eurPane$);

					$('<p></p>').html('El precio de la libra esterlina es de <strong>$'
						+ fx(1).from('GBP').to('MXN').toFixed(4) + '</strong> MXN').appendTo(gbpPane$);
					$('<p></p>').text(lastUpdate).appendTo(gbpPane$);

					annotation$.fadeToggle('slow');

				},
				error: function () {
					annotation$.fadeToggle('slow', function () {
						$(this).html('<span class="label label-important">Error</span>&nbsp;'
							+ 'Oh oh, algo no anda bien. Intenta de nuevo luego.');
					}).fadeIn('slow');
					$('.tabbable').fadeToggle('slow');
				}
			});
		};

	// jQuery Tiny Pub/Sub
	App.publish = function () { o.trigger.apply(o, arguments); };
	App.subscribe = function () { o.on.apply(o, arguments); };
	App.unsubscribe = function () { o.off.apply(o, arguments); };

	// Subscriptions/events
	App.subscribe('enable-js-class', function () {
		$(document.documentElement).removeClass('no-js').addClass('js');
	});

	App.subscribe('create-share-buttons', function () {
		var shareBar$ = $('.share-bar'),
			appendScript = function (url, id) {
				if (id !== undefined && document.getElementById(id) !== null) {
					return;
				}
				$('<script>').prop('src', url).prop('id', id).insertBefore('script:first');
			};

		// create a twitter button
		shareBar$.append('<div class="span1">'
			+ '<a href="https://twitter.com/share"'
				+ ' class="twitter-share-button"'
				+ ' data-url="http://alebelcor.github.com/a-cuanto-esta"'
				+ ' data-text="¿Quieres saber a cuánto está el dólar/euro/libra esterlina?"'
				+ ' data-via="alebelcor"'
				+ ' data-count="vertical">Tweet</a></div>');
		appendScript('//platform.twitter.com/widgets.js', 'twitter-wjs');

		// create a facebook button
		shareBar$.append('<div class="span1">'
			+ '<iframe src="//www.facebook.com/plugins/like.php?'
				+ 'href=http%3A%2F%2Falebelcor.github.com%2Fa-cuanto-esta'
				+ '&send=false'
				+ '&layout=box_count'
				+ '&show_faces=false'
				+ '&colorscheme=light'
				+ '&width=450&height=62"'
				+ ' scrolling="no" frameborder="0" style="border:none; overflow:hidden;'
				+ ' height:62px;" allowTransparency="true"></iframe></div>');

		// create a google+ button
		shareBar$.append('<div class="span1">'
			+ '<div class="g-plusone"'
				+ ' data-size="tall"'
				+ ' data-href="http://alebelcor.github.com/a-cuanto-esta"></div></div>');
		appendScript('//apis.google.com/js/plusone.js', '');

	});

	App.subscribe('init', function () {
		App.publish('enable-js-class');
		App.publish('create-share-buttons');
		loadRates();
	});

	$(function ($) {
		App.publish('init');
	});

}(jQuery, window));
