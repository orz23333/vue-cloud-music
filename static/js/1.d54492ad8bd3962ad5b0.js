webpackJsonp([1,2,11,13,14],{"0xS9":function(t,e,r){r("7q9M")("observable")},"2LoE":function(t,e,r){t.exports={default:r("2jG+"),__esModule:!0}},"2jG+":function(t,e,r){r("rYUz"),r("MKOc"),t.exports=r("RsVo").f("iterator")},"3+Wb":function(t,e){},"7q9M":function(t,e,r){var s=r("Dmm0"),n=r("/KQr"),i=r("4I+n"),o=r("RsVo"),a=r("0hE2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol=i?{}:s.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:o.f(t)})}},Algi:function(t,e){},BQOe:function(t,e,r){r("FMQC"),r("zjBV"),r("LPNR"),r("0xS9"),t.exports=r("/KQr").Symbol},FMQC:function(t,e,r){"use strict";var s=r("Dmm0"),n=r("ndDS"),i=r("2gJQ"),o=r("2AZ7"),a=r("D8Sn"),c=r("op0e").KEY,u=r("D86D"),l=r("TLnR"),h=r("AhUs"),f=r("R4LY"),v=r("aThA"),p=r("RsVo"),d=r("7q9M"),g=r("uCbw"),y=r("aLOx"),m=r("y4M0"),_=r("yLZD"),b=r("cKhS"),S=r("SwaK"),M=r("0ZA2"),C=r("+Vp4"),w=r("ZkHO"),O=r("QIvq"),x=r("0hE2"),q=r("H5bT"),j=O.f,k=x.f,E=w.f,D=s.Symbol,N=s.JSON,H=N&&N.stringify,Q=v("_hidden"),T=v("toPrimitive"),L={}.propertyIsEnumerable,A=l("symbol-registry"),z=l("symbols"),P=l("op-symbols"),F=Object.prototype,K="function"==typeof D,R=s.QObject,I=!R||!R.prototype||!R.prototype.findChild,$=i&&u(function(){return 7!=C(k({},"a",{get:function(){return k(this,"a",{value:7}).a}})).a})?function(t,e,r){var s=j(F,e);s&&delete F[e],k(t,e,r),s&&t!==F&&k(F,e,s)}:k,J=function(t){var e=z[t]=C(D.prototype);return e._k=t,e},B=K&&"symbol"==typeof D.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof D},V=function(t,e,r){return t===F&&V(P,e,r),m(t),e=S(e,!0),m(r),n(z,e)?(r.enumerable?(n(t,Q)&&t[Q][e]&&(t[Q][e]=!1),r=C(r,{enumerable:M(0,!1)})):(n(t,Q)||k(t,Q,M(1,{})),t[Q][e]=!0),$(t,e,r)):k(t,e,r)},Y=function(t,e){m(t);for(var r,s=g(e=b(e)),n=0,i=s.length;i>n;)V(t,r=s[n++],e[r]);return t},W=function(t){var e=L.call(this,t=S(t,!0));return!(this===F&&n(z,t)&&!n(P,t))&&(!(e||!n(this,t)||!n(z,t)||n(this,Q)&&this[Q][t])||e)},Z=function(t,e){if(t=b(t),e=S(e,!0),t!==F||!n(z,e)||n(P,e)){var r=j(t,e);return!r||!n(z,e)||n(t,Q)&&t[Q][e]||(r.enumerable=!0),r}},U=function(t){for(var e,r=E(b(t)),s=[],i=0;r.length>i;)n(z,e=r[i++])||e==Q||e==c||s.push(e);return s},X=function(t){for(var e,r=t===F,s=E(r?P:b(t)),i=[],o=0;s.length>o;)!n(z,e=s[o++])||r&&!n(F,e)||i.push(z[e]);return i};K||(a((D=function(){if(this instanceof D)throw TypeError("Symbol is not a constructor!");var t=f(arguments.length>0?arguments[0]:void 0),e=function(r){this===F&&e.call(P,r),n(this,Q)&&n(this[Q],t)&&(this[Q][t]=!1),$(this,t,M(1,r))};return i&&I&&$(F,t,{configurable:!0,set:e}),J(t)}).prototype,"toString",function(){return this._k}),O.f=Z,x.f=V,r("tkAn").f=w.f=U,r("n1iq").f=W,r("SQZr").f=X,i&&!r("4I+n")&&a(F,"propertyIsEnumerable",W,!0),p.f=function(t){return J(v(t))}),o(o.G+o.W+o.F*!K,{Symbol:D});for(var G="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;G.length>tt;)v(G[tt++]);for(var et=q(v.store),rt=0;et.length>rt;)d(et[rt++]);o(o.S+o.F*!K,"Symbol",{for:function(t){return n(A,t+="")?A[t]:A[t]=D(t)},keyFor:function(t){if(!B(t))throw TypeError(t+" is not a symbol!");for(var e in A)if(A[e]===t)return e},useSetter:function(){I=!0},useSimple:function(){I=!1}}),o(o.S+o.F*!K,"Object",{create:function(t,e){return void 0===e?C(t):Y(C(t),e)},defineProperty:V,defineProperties:Y,getOwnPropertyDescriptor:Z,getOwnPropertyNames:U,getOwnPropertySymbols:X}),N&&o(o.S+o.F*(!K||u(function(){var t=D();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))})),"JSON",{stringify:function(t){for(var e,r,s=[t],n=1;arguments.length>n;)s.push(arguments[n++]);if(r=e=s[1],(_(e)||void 0!==t)&&!B(t))return y(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!B(e))return e}),s[1]=e,H.apply(N,s)}}),D.prototype[T]||r("bnAR")(D.prototype,T,D.prototype.valueOf),h(D,"Symbol"),h(Math,"Math",!0),h(s.JSON,"JSON",!0)},Krso:function(t,e){},LPNR:function(t,e,r){r("7q9M")("asyncIterator")},NcgL:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("4YfN"),n=r.n(s),i=r("hxP8"),o=r("qwAB"),a=r("XEAW"),c=r("8stH"),u=r("T452"),l=r("HVJf"),h=r("btCL"),f=r("dC8W"),v=r("NfmQ"),p=r("WojS"),d={data:function(){return{query:"",activeIndex:0,filterShow:!0,hotKey:[],searches:[],tab:["单曲","歌手","歌单","Mv"],searchTab:["song","singer","disc","mv"]}},computed:n()({currentSearch:function(){return"search-"+this.searchTab[this.activeIndex]},scrollData:function(){return this.searchHistory.concat(this.hotKey)}},Object(l.c)(["searchHistory"])),methods:n()({getSearch:function(){this.$refs.search.getSearch(this.query),this.filterShow=!1,this.saveSearhHistory(this.query)},changeMode:function(t){this.activeIndex=t},clearQuery:function(){this.query=""},selectHot:function(t){this.query=t,this.$refs.search.getSearch(t),this.filterShow=!1,this.saveSearhHistory(t)},deleteOne:function(t){this.deleteSearhHistory(t)},clearAll:function(){this.$refs.confirm.show()},_getHotKey:function(){var t=this;Object(c.a)().then(function(e){e.code===u.b&&(t.hotKey=e.result.hots)})},focus:function(){this.$refs.input.focus()},active:function(t){return this.activeIndex==t?"active":""}},Object(l.b)(["saveSearhHistory","deleteSearhHistory","clearSearhHistory"])),created:function(){this._getHotKey()},watch:{query:function(t){var e=this;t||(this.filterShow=!0,setTimeout(function(){e.$refs.shortcut.refresh()},20))}},components:{CHeader:i.a,Scroll:o.a,SearchSong:h.default,SearchSinger:f.default,SearchDisc:v.default,SearchMv:p.default,Confirm:a.a}},g={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("c-header",{attrs:{icon:"icon-fangdajing",title:"搜索"}}),t._v(" "),r("div",{staticClass:"search-input-wrapper"},[r("div",{staticClass:"search-input",on:{click:t.focus}},[r("i",{staticClass:"icon-fangdajing"}),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"搜索歌曲，歌手，mv"},domProps:{value:t.query},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getSearch(e)},input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),r("i",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],staticClass:"icon-iconfontcha",on:{click:t.clearQuery}})]),t._v(" "),t.query?r("div",{staticClass:"search",on:{click:t.getSearch}},[t._v("搜索")]):t._e()]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[r("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:t.scrollData}},[r("div",[r("div",{staticClass:"hot-key"},[r("h1",{staticClass:"title"},[t._v("热门搜索")]),t._v(" "),r("ul",t._l(t.hotKey,function(e){return r("li",{key:e.first,staticClass:"item",on:{click:function(r){return t.selectHot(e.first)}}},[r("span",[t._v("\n                                "+t._s(e.first)+"\n                                "),e.iconType?r("sup",{staticClass:"sup"},[t._v("hot")]):t._e()])])}),0)]),t._v(" "),r("div",{staticClass:"search-history"},[r("h1",{staticClass:"title"},[r("span",{staticClass:"text"},[t._v("搜索历史")]),t._v(" "),r("span",{staticClass:"clear",on:{click:t.clearAll}},[r("i",{staticClass:"icon-lajitong"})])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-list"},[r("transition-group",{attrs:{name:"list",tag:"ul"}},t._l(t.searchHistory,function(e){return r("li",{key:e,staticClass:"search-item",on:{click:function(r){return t.selectHot(e)}}},[r("span",{staticClass:"history"},[r("i",{staticClass:"icon-shizhong"})]),t._v(" "),r("span",{staticClass:"text"},[t._v(t._s(e))]),t._v(" "),r("span",{staticClass:"icon",on:{click:function(r){return r.stopPropagation(),t.deleteOne(e)}}},[r("i",{staticClass:"icon-iconfontcha"})])])}),0)],1)])])])],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[r("div",{staticClass:"suggest"},[r("ul",{staticClass:"tab"},t._l(t.tab,function(e,s){return r("li",{key:s,staticClass:"item",class:t.active(s),on:{click:function(e){return t.changeMode(s)}}},[t._v(t._s(e))])}),0),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.filterShow,expression:"filterShow"}],staticClass:"filter"},[r("div",{staticClass:"inner"})]),t._v(" "),r("keep-alive",[r(t.currentSearch,{ref:"search",tag:"component",attrs:{query:t.query}})],1)],1)]),t._v(" "),r("confirm",{ref:"confirm",attrs:{confirmBtnText:"清空",text:"清空搜索历史？"},on:{confirm:t.clearSearhHistory}})],1)},staticRenderFns:[]};var y=r("C7Lr")(d,g,!1,function(t){r("zcBs")},"data-v-1fa2c385",null);e.default=y.exports},NfmQ:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("4YfN"),n=r.n(s),i=r("qwAB"),o=r("y/jF"),a=r("ggOy"),c=r("8stH"),u=r("T452"),l=r("HVJf"),h={props:{query:{type:String,default:""}},data:function(){return{type:1e3,page:0,pullup:!0,beforeScroll:!0,hasMore:!0,result:[],lastQuery:""}},activated:function(){this.query&&this.query!==this.lastQuery&&(this.result=[],this.hasMore=!0,this.getSearch(this.query))},methods:n()({selectDisc:function(t){this.changeDisc(t)},getSearch:function(t){this._searchDisc(t)},_searchDisc:function(t){var e=this;this.page=0,this.hasMore=!0,this.lastQuery=t,this.$refs.suggest&&this.$refs.suggest.scrollTo(0,0),Object(c.b)(t,this.type,this.page).then(function(t){if(t.code===u.b){if(void 0===t.result.playlists)return void(e.hasMore=!1);e.result=e._normalizeDisc(t.result.playlists),e.hasMore=e._checkMore(t.result.playlistCount)}})},_searchMoreDisc:function(){var t=this;this.hasMore&&(this.page++,Object(c.b)(this.query,this.type,this.page).then(function(e){if(e.code===u.b){if(void 0===e.result.playlists)return void(t.hasMore=!1);t.result=t.result.concat(t._normalizeDisc(e.result.playlists)),t.hasMore=t._checkMore(e.result.playlistCount)}}))},_checkMore:function(t){return this.result.length<t},filterDesc:function(t){var e="";return t.length&&(e=t.join("/")),e},_normalizeDisc:function(t){var e=this,r=[];return t.forEach(function(t){var s={};s.id=t.id,s.image=t.coverImgUrl,s.name=t.name,s.desc=t.trackCount+"首音乐 by "+t.creator.nickname,s.count=e._filterCount(t.playCount),r.push(s)}),r},_filterCount:function(t){var e=t/1e4;return e>=1?"播放"+e.toFixed(1)+"万次":"播放"+t+"次"}},Object(l.b)(["changeDisc"])),components:{Scroll:i.a,Loading:o.a,ListBar:a.a}},f={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"suggest"},[r("scroll",{ref:"suggest",staticClass:"scroll-wrapper",attrs:{data:t.result,pullup:t.pullup,beforeScroll:t.beforeScroll},on:{scrollToEnd:t._searchMoreDisc}},[r("div",[r("list-bar",{attrs:{list:t.result},on:{selectItem:t.selectDisc}}),t._v(" "),r("loading",{directives:[{name:"show",rawName:"v-show",value:t.hasMore,expression:"hasMore"}],attrs:{title:""}}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.hasMore&&!t.result.length,expression:"!hasMore && !result.length"}],staticClass:"no-result-wrapper"},[t._v("抱歉，暂无搜索结果")])],1)])],1)},staticRenderFns:[]};var v=r("C7Lr")(h,f,!1,function(t){r("Krso")},"data-v-1c3e7cee",null);e.default=v.exports},QIvq:function(t,e,r){var s=r("n1iq"),n=r("0ZA2"),i=r("cKhS"),o=r("SwaK"),a=r("ndDS"),c=r("Xv73"),u=Object.getOwnPropertyDescriptor;e.f=r("2gJQ")?u:function(t,e){if(t=i(t),e=o(e,!0),c)try{return u(t,e)}catch(t){}if(a(t,e))return n(!s.f.call(t,e),t[e])}},RsVo:function(t,e,r){e.f=r("aThA")},WojS:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("4YfN"),n=r.n(s),i=r("qwAB"),o=r("y/jF"),a=r("ggOy"),c=r("8stH"),u=r("T452"),l=r("HVJf"),h=r("ryJa"),f=r.n(h),v={props:{query:{type:String,default:""}},data:function(){return{type:1004,page:0,pullup:!0,beforeScroll:!0,hasMore:!0,result:[],lastQuery:""}},activated:function(){this.query&&this.query!==this.lastQuery&&(this.result=[],this.hasMore=!0,this.getSearch(this.query))},methods:n()({selectMv:function(t){this.playMv(t)},getSearch:function(t){this._searchMv(t)},_searchMv:function(t){var e=this;this.page=0,this.hasMore=!0,this.lastQuery=t,this.$refs.suggest&&this.$refs.suggest.scrollTo(0,0),Object(c.b)(t,this.type,this.page).then(function(t){if(t.code===u.b){if(void 0===t.result.mvs)return void(e.hasMore=!1);e.result=e._normalizeMv(t.result.mvs),e.hasMore=e._checkMore(t.result.mvCount)}})},_searchMoreMv:function(){var t=this;this.hasMore&&(this.page++,Object(c.b)(this.query,this.type,this.page).then(function(e){if(e.code===u.b){if(void 0===e.result.mvs)return void(t.hasMore=!1);t.result=t.result.concat(t._normalizeMv(e.result.mvs)),t.hasMore=t._checkMore(e.result.mvCount)}}))},_checkMore:function(t){return this.result.length<t},filterDesc:function(t){var e="";return t.length&&(e=t.join("/")),e},_normalizeMv:function(t){var e=this,r=[];return t.forEach(function(t){var s={};s.id=t.id,s.image=t.cover,s.name=t.name,s.desc=e._formalTime(t.duration)+", by "+t.artists.name,s.count=e._filterCount(t.playCount),r.push(s)}),r},_filterCount:function(t){var e=t/1e4;return e>=1?"播放"+e.toFixed(1)+"万次":"播放"+t+"次"},_formalTime:function(t){var e=f()(t).utcOffset(0).format("h:mm:ss"),r=e.split(":");return"12"===r[0]&&r.shift(),e=r.join(":")}},Object(l.b)(["playMv"])),components:{Scroll:i.a,Loading:o.a,ListBar:a.a}},p={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"suggest"},[r("scroll",{ref:"suggest",staticClass:"scroll-wrapper",attrs:{data:t.result,pullup:t.pullup,beforeScroll:t.beforeScroll},on:{scrollToEnd:t._searchMoreMv}},[r("div",[r("list-bar",{attrs:{list:t.result,icon:"icon-MV"},on:{selectItem:t.selectMv}}),t._v(" "),r("loading",{directives:[{name:"show",rawName:"v-show",value:t.hasMore,expression:"hasMore"}],attrs:{title:""}}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.hasMore&&!t.result.length,expression:"!hasMore && !result.length"}],staticClass:"no-result-wrapper"},[t._v("抱歉，暂无搜索结果")])],1)])],1)},staticRenderFns:[]};var d=r("C7Lr")(v,p,!1,function(t){r("iXby")},"data-v-395433d7",null);e.default=d.exports},Yyxk:function(t,e,r){t.exports={default:r("BQOe"),__esModule:!0}},ZkHO:function(t,e,r){var s=r("cKhS"),n=r("tkAn").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?function(t){try{return n(t)}catch(t){return o.slice()}}(t):n(s(t))}},aLOx:function(t,e,r){var s=r("402Z");t.exports=Array.isArray||function(t){return"Array"==s(t)}},btCL:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("3cXf"),n=r.n(s),i=r("hRKE"),o=r.n(i),a=r("4YfN"),c=r.n(a),u=r("qwAB"),l=r("y/jF"),h={props:{title:{type:String,default:""}}},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"no-result"},[e("div",{staticClass:"no-result-icon"}),this._v(" "),e("p",{staticClass:"no-result-text"},[this._v(this._s(this.title))])])},staticRenderFns:[]};r("C7Lr")(h,f,!1,function(t){r("3+Wb")},"data-v-20167d15",null).exports;var v=r("8stH"),p=r("T452"),d=r("HVJf"),g=r("9cIF"),y={props:{query:{type:String,default:""}},data:function(){return{type:1,page:0,pullup:!0,beforeScroll:!0,hasMore:!0,result:[],lastQuery:""}},activated:function(){this.query&&this.query!==this.lastQuery&&this.getSearch(this.query)},methods:c()({select:function(t){t.url&&this.insertSong(t)},selectMv:function(t){this.playMv(t.mvId)},getSearch:function(t){this._searchSong(t)},_searchSong:function(t){var e=this;this.page=0,this.hasMore=!0,this.result=[],this.lastQuery=t,this.$refs.suggest&&this.$refs.suggest.scrollTo(0,0),Object(v.b)(t,this.type,this.page).then(function(t){if(t.code===p.b){if(void 0===t.result.songs)return e.result=[],void(e.hasMore=!1);e.result=e._normalizeSong(t.result.songs),e.hasMore=e._checkMore(t.result.songCount),e._getUrl(e.result)}})},_searchMoreSong:function(){var t=this;this.hasMore&&(this.page++,Object(v.b)(this.query,this.type,this.page).then(function(e){if(e.code===p.b){if(void 0===e.result.songs)return t.hasMore=!1,void console.log(o()(e.result.songs));t.result=t.result.concat(t._normalizeSong(e.result.songs)),t.hasMore=t._checkMore(e.result.songCount),t._getUrl(t.result)}}))},_checkMore:function(t){return this.result.length<t},_normalizeSong:function(t){var e=this,r=[];return t.forEach(function(t){r.push(e.createSong(t))}),r},createSong:function(t){var e={type:"song"};return e.id=t.id,e.name=t.name,e.desc=this.filterDesc(t.alias),e.singer=this.filterSinger(t.artists),e.album=t.album.name,e.mvId=t.mvid,e.duration=t.duration,e},filterSinger:function(t){var e=[],r="";return t.length&&(t.forEach(function(t){e.push(t.name)}),r=e.join("/")),r},filterDesc:function(t){var e="";return t.length&&(e=t.join("/")),e},_getUrl:function(t){var e=this,r=[];t.forEach(function(t){r.push(t.id)});var s=r.join(",");Object(g.b)(s).then(function(t){if(t.code===p.b){var r=t.data,s=JSON.parse(n()(e.result));s.forEach(function(t){r.forEach(function(e){e.id===t.id&&(t.url=e.url)})}),e.result=s}})},disable:function(t){return t.url?"":"disable"}},Object(d.b)(["insertSong","playMv"])),components:{Scroll:u.a,Loading:l.a}},m={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"suggest"},[r("scroll",{ref:"suggest",staticClass:"scroll-wrapper",attrs:{data:t.result,pullup:t.pullup,beforeScroll:t.beforeScroll},on:{scrollToEnd:t._searchMoreSong}},[r("div",[t.result.length?r("ul",{staticClass:"suggest-list"},[t._l(t.result,function(e,s){return r("li",{key:s+e.name+e.id,staticClass:"suggest-item",class:t.disable(e),on:{click:function(r){return t.select(e)}}},[r("div",{staticClass:"name"},[r("p",{staticClass:"text"},[t._v(t._s(e.name))]),t._v(" "),r("p",{staticClass:"center"},[t._v(t._s(e.singer)+"-"+t._s(e.album))]),t._v(" "),r("p",{staticClass:"bottom"},[t._v(t._s(e.desc))])]),t._v(" "),r("div",{staticClass:"mv",on:{click:function(r){return r.stopPropagation(),t.selectMv(e)}}},[e.mvId?r("i",{staticClass:"icon-bofang1"}):t._e()])])}),t._v(" "),r("loading",{directives:[{name:"show",rawName:"v-show",value:t.hasMore,expression:"hasMore"}],attrs:{title:""}})],2):t._e(),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.hasMore&&!t.result.length,expression:"!hasMore && !result.length"}],staticClass:"no-result-wrapper"},[t._v("抱歉，暂无搜索结果")])])])],1)},staticRenderFns:[]};var _=r("C7Lr")(y,m,!1,function(t){r("Algi")},"data-v-9c520bd4",null);e.default=_.exports},dC8W:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("4YfN"),n=r.n(s),i=r("qwAB"),o=r("y/jF"),a=r("8stH"),c=r("T452"),u=r("HVJf"),l={props:{query:{type:String,default:""}},data:function(){return{type:100,page:0,pullup:!0,beforeScroll:!0,hasMore:!0,result:[]}},activated:function(){this.query&&this.query!==this.lastQuery&&(this.result=[],this.hasMore=!0,this.getSearch(this.query))},methods:n()({selectDisc:function(t){this.changeDisc(t)},getSearch:function(t){this._searchSinger(t)},_searchSinger:function(t){var e=this;this.page=0,this.hasMore=!0,this.lastQuery=t,this.$refs.suggest&&this.$refs.suggest.scrollTo(0,0),Object(a.b)(t,this.type,this.page).then(function(t){if(t.code===c.b){if(void 0===t.result.artists)return void(e.hasMore=!1);e.result=e._normalizeSinger(t.result.artists),e.hasMore=e._checkMore(t.result.artistCount)}})},_searchMoreSinger:function(){var t=this;this.hasMore&&(this.page++,Object(a.b)(this.query,this.type,this.page).then(function(e){if(e.code===c.b){if(void 0===e.result.artists)return void(t.hasMore=!1);t.result=t.result.concat(t._normalizeSinger(e.result.artists)),t.hasMore=t._checkMore(e.result.artistCount)}}))},_checkMore:function(t){return this.result.length<t},filterDesc:function(t){var e="";return t.length&&(e=t.join("/")),e},_normalizeSinger:function(t){var e=this,r=[];return t.forEach(function(t){var s={};s.id=t.id,s.image=t.picUrl,s.name=t.name,s.desc=""+e.filterDesc(t.alias),r.push(s)}),r}},Object(u.b)(["changeDisc"])),components:{Scroll:i.a,Loading:o.a}},h={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"suggest"},[r("scroll",{ref:"suggest",staticClass:"scroll-wrapper",attrs:{data:t.result,pullup:t.pullup,beforeScroll:t.beforeScroll},on:{scrollToEnd:t._searchMoreSinger}},[r("div",[t._l(t.result,function(e){return r("div",{key:e.id,staticClass:"item"},[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.image,expression:"item.image"}],attrs:{alt:""}}),t._v(" "),r("p",{staticClass:"text"},[t._v("\n                    "+t._s(e.name)+"\n                    "),e.desc?r("span",{staticClass:"desc"},[t._v("("+t._s(e.desc)+")")]):t._e()])])}),t._v(" "),r("loading",{directives:[{name:"show",rawName:"v-show",value:t.hasMore,expression:"hasMore"}],attrs:{title:""}}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.hasMore&&!t.result.length,expression:"!hasMore && !result.length"}],staticClass:"no-result-wrapper"},[t._v("抱歉，暂无搜索结果")])],2)])],1)},staticRenderFns:[]};var f=r("C7Lr")(l,h,!1,function(t){r("mzEg")},"data-v-31ea3710",null);e.default=f.exports},hRKE:function(t,e,r){"use strict";e.__esModule=!0;var s=o(r("2LoE")),n=o(r("Yyxk")),i="function"==typeof n.default&&"symbol"==typeof s.default?function(t){return typeof t}:function(t){return t&&"function"==typeof n.default&&t.constructor===n.default&&t!==n.default.prototype?"symbol":typeof t};function o(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof n.default&&"symbol"===i(s.default)?function(t){return void 0===t?"undefined":i(t)}:function(t){return t&&"function"==typeof n.default&&t.constructor===n.default&&t!==n.default.prototype?"symbol":void 0===t?"undefined":i(t)}},iXby:function(t,e){},mzEg:function(t,e){},op0e:function(t,e,r){var s=r("R4LY")("meta"),n=r("yLZD"),i=r("ndDS"),o=r("0hE2").f,a=0,c=Object.isExtensible||function(){return!0},u=!r("D86D")(function(){return c(Object.preventExtensions({}))}),l=function(t){o(t,s,{value:{i:"O"+ ++a,w:{}}})},h=t.exports={KEY:s,NEED:!1,fastKey:function(t,e){if(!n(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,s)){if(!c(t))return"F";if(!e)return"E";l(t)}return t[s].i},getWeak:function(t,e){if(!i(t,s)){if(!c(t))return!0;if(!e)return!1;l(t)}return t[s].w},onFreeze:function(t){return u&&h.NEED&&c(t)&&!i(t,s)&&l(t),t}}},tkAn:function(t,e,r){var s=r("2Dza"),n=r("RxNJ").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return s(t,n)}},uCbw:function(t,e,r){var s=r("H5bT"),n=r("SQZr"),i=r("n1iq");t.exports=function(t){var e=s(t),r=n.f;if(r)for(var o,a=r(t),c=i.f,u=0;a.length>u;)c.call(t,o=a[u++])&&e.push(o);return e}},zcBs:function(t,e){}});
//# sourceMappingURL=1.d54492ad8bd3962ad5b0.js.map