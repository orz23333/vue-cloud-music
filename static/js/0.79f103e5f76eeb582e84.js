webpackJsonp([0],{"8stH":function(t,a,e){"use strict";a.a=function(){return s.a.get("http://localhost:3000/search/hot",{params:{}}).then(function(t){return r.a.resolve(t.data)})},a.b=function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:30,o={keywords:t,type:a,limit:n,offset:e*n};return s.a.get("http://localhost:3000/search",{params:o}).then(function(t){return r.a.resolve(t.data)})};var n=e("rVsN"),r=e.n(n),o=(e("Gak4"),e("T452"),e("BMa3")),s=e.n(o)}});
//# sourceMappingURL=0.79f103e5f76eeb582e84.js.map