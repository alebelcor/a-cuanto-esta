$(function () {
    'use strict';

    var dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        loadRates = function () {
            $.getJSON('http://openexchangerates.org/latest.json', function (json) {
                var timestamp = new Date(json.timestamp * 1000),
                    day = dayNames[timestamp.getDay()],
                    month = monthNames[timestamp.getMonth()];

                $('#price').text('El precio del dólar es de $' + json.rates.MXN + ' MXN');
                $('#when').text('Cuando: '
                    + day + ', '
                    + month + ' '
                    + timestamp.getDate() + ' '
                    + timestamp.getFullYear() + ', '
                    + timestamp.toLocaleTimeString());
            });
        };

    $(document.documentElement).removeClass('no-js').addClass('js');
    loadRates();
});
