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

                //$('#annotation').toggleClass('invisible');
                $('#annotation').fadeToggle();
            }).error(function () {
                $('#annotation').find('h3')
                    .html('<span class="label label-important">Error</span>&thinsp;'
                        + 'Oh oh, hubo algún error. Intenta de nuevo luego.');
            });
        };

    $(document.documentElement).removeClass('no-js').addClass('js');
    loadRates();
});
