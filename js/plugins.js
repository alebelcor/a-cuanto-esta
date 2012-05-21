// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-tab.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
;(function(a){var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery));

/* money.js 0.1.3, MIT license, josscrowcroft.github.com/money.js */
;(function(g,j){var b=function(a){return new i(a)};b.version="0.1.3";var c=g.fxSetup||{rates:{},base:""};b.rates=c.rates;b.base=c.base;b.settings={from:c.from||b.base,to:c.to||b.base};var h=b.convert=function(a,e){if("object"===typeof a&&a.length){for(var d=0;d<a.length;d++)a[d]=h(a[d],e);return a}e=e||{};if(!e.from)e.from=b.settings.from;if(!e.to)e.to=b.settings.to;var d=e.to,c=e.from,f=b.rates;f[b.base]=1;if(!f[d]||!f[c])throw"fx error";d=c===b.base?f[d]:d===b.base?1/f[c]:f[d]*(1/f[c]);return a*d},i=function(a){"string"===typeof a?(this._v=parseFloat(a.replace(/[^0-9-.]/g,"")),this._fx=a.replace(/([^A-Za-z])/g,"")):this._v=a},c=b.prototype=i.prototype;c.convert=function(){var a=Array.prototype.slice.call(arguments);a.unshift(this._v);return h.apply(b,a)};c.from=function(a){a=b(h(this._v,{from:a,to:b.base}));a._fx=b.base;return a};c.to=function(a){return h(this._v,{from:this._fx?this._fx:b.settings.from,to:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=b;exports.fx=fx}else"function"===typeof define&&define.amd?define([],function(){return b}):(b.noConflict=function(a){return function(){g.fx=a;b.noConflict=j;return b}}(g.fx),g.fx=b)}(this));

/**
* @preserve Copyright 2012 Twitter, Inc.
* @license http://www.apache.org/licenses/LICENSE-2.0.txt
*/
var Hogan={};(function(a,b){function i(a){return String(a===null||a===undefined?"":a)}function j(a){return a=i(a),h.test(a)?a.replace(c,"&amp;").replace(d,"&lt;").replace(e,"&gt;").replace(f,"&#39;").replace(g,"&quot;"):a}a.Template=function(a,c,d,e){this.r=a||this.r,this.c=d,this.options=e,this.text=c||"",this.buf=b?[]:""},a.Template.prototype={r:function(a,b,c){return""},v:j,t:i,render:function(b,c,d){return this.ri([b],c||{},d)},ri:function(a,b,c){return this.r(a,b,c)},rp:function(a,b,c,d){var e=c[a];return e?(this.c&&typeof e=="string"&&(e=this.c.compile(e,this.options)),e.ri(b,c,d)):""},rs:function(a,b,c){var d=a[a.length-1];if(!k(d)){c(a,b,this);return}for(var e=0;e<d.length;e++)a.push(d[e]),c(a,b,this),a.pop()},s:function(a,b,c,d,e,f,g){var h;return k(a)&&a.length===0?!1:(typeof a=="function"&&(a=this.ls(a,b,c,d,e,f,g)),h=a===""||!!a,!d&&h&&b&&b.push(typeof a=="object"?a:b[b.length-1]),h)},d:function(a,b,c,d){var e=a.split("."),f=this.f(e[0],b,c,d),g=null;if(a==="."&&k(b[b.length-2]))return b[b.length-1];for(var h=1;h<e.length;h++)f&&typeof f=="object"&&e[h]in f?(g=f,f=f[e[h]]):f="";return d&&!f?!1:(!d&&typeof f=="function"&&(b.push(g),f=this.lv(f,b,c),b.pop()),f)},f:function(a,b,c,d){var e=!1,f=null,g=!1;for(var h=b.length-1;h>=0;h--){f=b[h];if(f&&typeof f=="object"&&a in f){e=f[a],g=!0;break}}return g?(!d&&typeof e=="function"&&(e=this.lv(e,b,c)),e):d?!1:""},ho:function(a,b,c,d,e){var f=this.c,g=this.options;g.delimiters=e;var d=a.call(b,d);return d=d==null?String(d):d.toString(),this.b(f.compile(d,g).render(b,c)),!1},b:b?function(a){this.buf.push(a)}:function(a){this.buf+=a},fl:b?function(){var a=this.buf.join("");return this.buf=[],a}:function(){var a=this.buf;return this.buf="",a},ls:function(a,b,c,d,e,f,g){var h=b[b.length-1],i=null;if(!d&&this.c&&a.length>0)return this.ho(a,h,c,this.text.substring(e,f),g);i=a.call(h);if(typeof i=="function"){if(d)return!0;if(this.c)return this.ho(i,h,c,this.text.substring(e,f),g)}return i},lv:function(a,b,c){var d=b[b.length-1],e=a.call(d);if(typeof e=="function"){e=i(e.call(d));if(this.c&&~e.indexOf("{{"))return this.c.compile(e,this.options).render(d,c)}return i(e)}};var c=/&/g,d=/</g,e=/>/g,f=/\'/g,g=/\"/g,h=/[&<>\"\']/,k=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"}}(typeof exports!="undefined"?exports:Hogan))
