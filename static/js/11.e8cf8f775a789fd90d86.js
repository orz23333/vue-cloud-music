webpackJsonp([11],{WojS:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("4YfN"),i=r.n(s),o=r("qwAB"),a=r("y/jF"),n=r("ggOy"),u=r("8stH"),l=r("T452"),c=r("HVJf"),h=r("ryJa"),v=r.n(h),f={props:{query:{type:String,default:""}},data:function(){return{type:1004,page:0,pullup:!0,beforeScroll:!0,hasMore:!0,result:[],lastQuery:""}},activated:function(){this.query&&this.query!==this.lastQuery&&(this.result=[],this.hasMore=!0,this.getSearch(this.query))},methods:i()({selectMv:function(e){this.playMv(e)},getSearch:function(e){this._searchMv(e)},_searchMv:function(e){var t=this;this.page=0,this.hasMore=!0,this.lastQuery=e,this.$refs.suggest&&this.$refs.suggest.scrollTo(0,0),Object(u.b)(e,this.type,this.page).then(function(e){if(e.code===l.b){if(void 0===e.result.mvs)return void(t.hasMore=!1);t.result=t._normalizeMv(e.result.mvs),t.hasMore=t._checkMore(e.result.mvCount)}})},_searchMoreMv:function(){var e=this;this.hasMore&&(this.page++,Object(u.b)(this.query,this.type,this.page).then(function(t){if(t.code===l.b){if(void 0===t.result.mvs)return void(e.hasMore=!1);e.result=e.result.concat(e._normalizeMv(t.result.mvs)),e.hasMore=e._checkMore(t.result.mvCount)}}))},_checkMore:function(e){return this.result.length<e},filterDesc:function(e){var t="";return e.length&&(t=e.join("/")),t},_normalizeMv:function(e){var t=this,r=[];return e.forEach(function(e){var s={};s.id=e.id,s.image=e.cover,s.name=e.name,s.desc=t._formalTime(e.duration)+", by "+e.artists.name,s.count=t._filterCount(e.playCount),r.push(s)}),r},_filterCount:function(e){var t=e/1e4;return t>=1?"播放"+t.toFixed(1)+"万次":"播放"+e+"次"},_formalTime:function(e){var t=v()(e).utcOffset(0).format("h:mm:ss"),r=t.split(":");return"12"===r[0]&&r.shift(),t=r.join(":")}},Object(c.b)(["playMv"])),components:{Scroll:o.a,Loading:a.a,ListBar:n.a}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"suggest"},[r("scroll",{ref:"suggest",staticClass:"scroll-wrapper",attrs:{data:e.result,pullup:e.pullup,beforeScroll:e.beforeScroll},on:{scrollToEnd:e._searchMoreMv}},[r("div",[r("list-bar",{attrs:{list:e.result,icon:"icon-MV"},on:{selectItem:e.selectMv}}),e._v(" "),r("loading",{directives:[{name:"show",rawName:"v-show",value:e.hasMore,expression:"hasMore"}],attrs:{title:""}}),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.hasMore&&!e.result.length,expression:"!hasMore && !result.length"}],staticClass:"no-result-wrapper"},[e._v("抱歉，暂无搜索结果")])],1)])],1)},staticRenderFns:[]};var d=r("C7Lr")(f,p,!1,function(e){r("iXby")},"data-v-395433d7",null);t.default=d.exports},iXby:function(e,t){}});
//# sourceMappingURL=11.e8cf8f775a789fd90d86.js.map