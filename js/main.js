$(function () {
	'use strict';

	var dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
		monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
				'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		loadRates = function () {
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
				$('#annotation').fadeToggle('slow');

			}).error(function () {
				$('#annotation')
					.fadeToggle('slow', function () {
						$(this).html('<span class="label label-important">Error</span>&nbsp;'
						+ 'Oh oh, algo no anda bien. Intenta de nuevo luego.');
					}).fadeIn('slow');
				$('.tabbable').fadeToggle('slow');
			});
		};

	$(document.documentElement).removeClass('no-js').addClass('js');
	$('#annotation').html('<span>Cargando información... </span>'
		+ '<img src="img/loader.gif" alt="ícono de cargador" title="Cargando...">');
	loadRates();

});
