webpackJsonp([12],{hk2P:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=n("3cXf"),i=n.n(a),e=n("4YfN"),o=n.n(e),c=n("ggOy"),l=n("hxP8"),r=n("qwAB"),d=n("ZV4u"),u=n("HVJf"),f=n("W/7t"),h=n("9cIF"),v=n("T452"),g={data:function(){return{songs:[]}},computed:o()({},Object(u.c)(["mode","songHistory"])),created:function(){this._getUrl()},methods:o()({back:function(){this.$router.back()},setPlayMv:function(t){this.playMv(t)},setPlayList:function(t,s){this.selectPlay({list:this.songs,index:s})},playAll:function(){var t=void 0;t=this.mode===f.a.random?Math.floor(Math.random()*(this.songs.length+1)):0,this.selectPlay({list:this.songs,index:t})},_getUrl:function(){var t=this,s=[];this.songHistory.forEach(function(t){s.push(t.id)});var n=s.join(",");Object(h.b)(n).then(function(s){if(s.code===v.b){var n=s.data,a=JSON.parse(i()(t.songHistory));a.forEach(function(t){n.forEach(function(s){s.id===t.id&&(t.url=s.url)})}),t.songs=a}})}},Object(u.b)(["selectPlay","playMv"])),components:{ListBar:c.a,CHeader:l.a,Scroll:r.a,SongList:d.a}},p={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("transition",{attrs:{name:"slide"}},[n("div",{staticClass:"like"},[n("c-header",{attrs:{title:"最近播放的歌曲",icon:"icon-2fanhui",back:t.back}}),t._v(" "),n("scroll",{staticClass:"scroll-wrapper",attrs:{data:t.songs}},[n("div",[n("div",{staticClass:"control",on:{click:t.playAll}},[n("i",{staticClass:"icon-bofang"}),t._v(" "),n("span",[t._v("播放全部(共首)")])]),t._v(" "),n("song-list",{attrs:{songs:t.songs},on:{selectMv:t.setPlayMv,select:t.setPlayList}})],1)])],1)])},staticRenderFns:[]};var y=n("C7Lr")(g,p,!1,function(t){n("pPY/")},"data-v-376a5bd7",null);s.default=y.exports},"pPY/":function(t,s){}});
//# sourceMappingURL=12.1c897194f8f2374c4115.js.map