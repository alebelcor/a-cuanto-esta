var templates = {};

/*! pre-compiled from: templates/data-row.mustache */
templates['data-row'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<tr>");_.b("\n" + i);_.b(" <td><a href=\"//es.wikipedia.org/w/index.php?search=");_.b(_.v(_.f("currencyFrom",c,p,0)));_.b("\">");_.b(_.v(_.f("currencyFrom",c,p,0)));_.b("</a></td>");_.b("\n" + i);_.b("  <td>$");_.b(_.v(_.f("exchangeRate",c,p,0)));_.b(" ");_.b(_.v(_.f("currencyTo",c,p,0)));_.b("</td>");_.b("\n" + i);_.b("</tr>");return _.fl();;});

/*! precompiled from: templates/last-update.mustache */
templates['last-update'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<p class=\"span3\">");_.b("\n" + i);_.b("    <time class=\"last-update\" title=\"Última actualización\" datetime=\"");_.b(_.v(_.f("machineReadable",c,p,0)));_.b("\">");_.b(_.v(_.f("humanReadable",c,p,0)));_.b("</time>");_.b("\n" + i);_.b("</p>");return _.fl();;});
