webpackJsonp([5],{"84oL":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("4YfN"),s=i.n(a),r=i("ggOy"),n=i("hxP8"),c=i("qwAB"),o=i("HVJf"),l=i("ryJa"),f=i.n(l),u={computed:s()({list:function(){var t=this,e=[];return this.favoriteMv.forEach(function(i){var a={};a.image=i.cover,a.name=i.name,a.desc=t._formalTime(i.duration)+","+i.artistName,a.id=i.id,e.push(a)}),e}},Object(o.c)(["favoriteMv"])),methods:s()({back:function(){this.$router.back()},selectMv:function(t){this.playMv(t)},_formalTime:function(t){var e=f()(t).utcOffset(0).format("h:mm:ss"),i=e.split(":");return"12"===i[0]&&i.shift(),e=i.join(":")}},Object(o.b)(["playMv"])),components:{ListBar:r.a,CHeader:n.a,Scroll:c.a}},v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"slide"}},[e("div",{staticClass:"like"},[e("c-header",{attrs:{icon:"icon-2fanhui",back:this.back,title:"收藏MV"}}),this._v(" "),e("scroll",{staticClass:"scroll-wrapper",attrs:{data:this.favoriteMv}},[e("list-bar",{attrs:{list:this.list,icon:"icon-MV"},on:{selectItem:this.selectMv}})],1),this._v(" "),e("router-view")],1)])},staticRenderFns:[]};var h=i("C7Lr")(u,v,!1,function(t){i("l3SN")},"data-v-b7996726",null);e.default=h.exports},l3SN:function(t,e){}});
//# sourceMappingURL=5.715313a9e2a65e453375.js.map