;(function ($, window, undefined) {
	'use strict';

	var App = {},

		o = $({}),

		document = window.document,

		enableJSClass = function () {
			$(document.documentElement).removeClass('no-js').addClass('js');
		},

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
	App.publish = function () {
		o.trigger.apply(o, arguments);
	};
	App.subscribe = function () {
		o.on.apply(o, arguments);
	};
	App.unsubscribe = function () {
		o.off.apply(o, arguments);
	};

	// **************
	// Subscriptions
	// **************
	App.subscribe("init", function () {
		enableJSClass();
		loadRates();
	});

	// *******
	// Events
	// *******

	// DOM Ready
	$(function ($) {
		App.publish("init");
	});

	// Window unload
	//$(window).unload(function () {
	//	App.publish("destroy");
	//});

}(jQuery, window));
