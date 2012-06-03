(function ($, window, undefined) {
	'use strict';

	var document = window.document,
		templates = window.templates,
		annotation$ = $('#js-annotation'),
		// jQuery Tiny Pub/Sub
		o = $({}),
		App = {
			publish: function () { o.trigger.apply(o, arguments); },
			subscribe: function () { o.on.apply(o, arguments); },
			unsubscribe: function () { o.off.apply(o, arguments); }
		};

	// Subscriptions/events
	App.subscribe('config', function () {
		moment.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
			'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	});

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
				+ ' data-lang="en"'
				+ ' data-url="http://alebelcor.github.com/a-cuanto-esta"'
				+ ' data-text="¿Quieres saber el tipo de cambio de las monedas más comunes?"'
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

	App.subscribe('show-annotation-message', function (e, msg) {
		var message = msg || '<div class="span3"><span>Cargando... </span>'
			+ '<img src="img/loader.gif" alt="ícono de carga rotatorio" title="Cargando..."></div>';

		annotation$.promise('fx').done(function () {
			$(this).html(message).fadeIn('slow');
		})
	});

	App.subscribe('hide-annotation-message', function () {
		annotation$.promise('fx').done(function () {
			$(this).fadeToggle('slow', function () {
				$(this).empty();
			});
		});
	});

	App.subscribe('load-exchange-rates', function () {

		App.publish('show-annotation-message');

		$.ajax({
			url: '//openexchangerates.org/latest.json',
			dataType: 'jsonp',
			cache: false,
			success: function (json) {
				var dataRowTmpl = templates['data-row'],
					lastUpdateTmpl = templates['last-update'],

					dataTable$ = $('#js-data-table'),
					lastUpdate$ = $('#js-last-update'),
					timestamp = moment.unix(json.timestamp);

				fx.rates = json.rates;
				fx.base = json.base;

				dataTable$.append(dataRowTmpl.render({
					currencyFrom: 'USD',
					currencyTo: 'MXN',
					exchangeRate: fx(1).from('USD').to('MXN').toFixed(4)
				}));

				dataTable$.append(dataRowTmpl.render({
					currencyFrom: 'EUR',
					currencyTo: 'MXN',
					exchangeRate: fx(1).from('EUR').to('MXN').toFixed(4)
				}));

				dataTable$.append(dataRowTmpl.render({
					currencyFrom: 'GBP',
					currencyTo: 'MXN',
					exchangeRate: fx(1).from('GBP').to('MXN').toFixed(4)
				}));

				App.publish('hide-annotation-message');

				dataTable$.fadeIn('slow').removeClass('hidden');
				lastUpdate$.fadeToggle('slow', function () {
					$(this).append(lastUpdateTmpl.render({
						machineReadable: timestamp.format(),
						humanReadable: timestamp.format('h A - MMMM D YYYY')
					}));
				}).fadeIn('slow');
			},
			error: function () {
				$(document.documentElement).addClass('error');
				App.publish('hide-annotation-message');
				App.publish('show-annotation-message', '<div class="span5">'
					+ '<span class="label label-important">Error</span>'
					+ '<em> Oh oh, algo no anda bien. Intenta de nuevo luego.</em></div>');
				$('.tabbable').fadeToggle('slow');
			}
		});
	});

	App.subscribe('init', function () {
		App.publish('config');
		App.publish('enable-js-class');
		App.publish('create-share-buttons');
		App.publish('load-exchange-rates');
	});

	$(function () {
		App.publish('init');
	});

}(jQuery, window));
