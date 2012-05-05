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

			$.getJSON('http://openexchangerates.org/latest.json', function (json) {
				var timestamp = new Date(json.timestamp * 1000),
					day = dayNames[timestamp.getDay()],
					month = monthNames[timestamp.getMonth()],
					usdPane$ = $('#usd-pane');

				$('<p></p>').html('El precio del dólar es de <strong>$' + json.rates.MXN + '</strong> MXN')
					.appendTo(usdPane$);
				$('<p></p>').text('Última actualización: ' + day + ', ' + month + ' ' + timestamp.getDate()
					+ ' ' + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString())
					.appendTo(usdPane$);
				annotation$.fadeToggle('slow');

			}).error(function () {
				annotation$
					.fadeToggle('slow', function () {
						$(this).html('<span class="label label-important">Error</span>&nbsp;'
							+ 'Oh oh, algo no anda bien. Intenta de nuevo luego.');
					}).fadeIn('slow');
				$('.tabbable').fadeToggle('slow');
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
