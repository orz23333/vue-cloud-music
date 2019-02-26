# vue-cloud-music

> 这是个人在学习vue之后用来练手的项目，模仿的是ios版网易云，api接口来自NeteaseCloudMusicApi，所以在运行之前需要安装NeteaseCloudMusicApi（github搜索），并运行node app.js，然后再npm i本项目的依赖，之后便可以npm run dev运行服务。

## 项目安装使用

``` bash
# 在NeteaseCloudMusicApi终端下运行
node app.js

# 在本项目终端下运行，安装依赖
npm install

# serve with hot reload at localhost:8088
npm run dev

然后打开浏览器，即可在地址栏输入localhost:8088打开，点击F12进行使用
```

## 技术栈
 + vue2.3^：vue框架
 + vue-router2：用来实现路由跳转，模拟线上环境，提供良好体验
 + vuex：状态管理
 + HTML5和css3： 提供良好的用户体验  
 + es6：不断进取，拥抱新技术，简化代码
 + webpack：基于vue-cli配置webpack
 + axios：基于Promise的http库，用于解决跨域问题
 + stylus：css预处理，提高效率，提供良好的可维护性
 + flex：优秀的网页布局技术，在移动端具有优秀的兼容性，并且能够提高开发效率
 + better-scroll：解决滚动问题，防止出现滚动条，并且提供多种事件与属性、方法，方便开发
 + fastclick：解决移动端点击延迟问题
 + good-storage： 轻量级库，解决非核心问题的离线存储问题
 + jsonp：用于解决跨域
 + vue-lazyload：图片懒加载，优化性能，节约流量


## 功能
  ### 歌曲部分
  - [x] 首页歌单推荐
  - [x] 歌单详情
  - [x] 歌单收藏
  - [x] 查看歌单评论
  - [x] 播放器
  - [x] 播放器播放与暂停
  - [x] 播放模式改变（顺序，随机，单曲循环）
  - [x] 点击，拖拽进度条改变进度
  - [x] 上一曲，下一曲切歌
  - [x] 保存播放列表，下次打开直接展开播放器继续歌单列表播放
  - [x] 收藏歌曲
  - [x] 查看歌曲评论
  - [x] 查看播放列表
  - [x] 播放列表歌曲添加，删除，清空
  - [ ] ~~歌词（待加入）~~
  - [ ] ~~歌词滚动（待加入）~~
  - [x] 搜索推荐
  - [x] 搜索分类（歌曲，歌手，mv，歌单）
  - [x] ~~歌手详情（待加入）~~
  - [x] 播放历史（歌曲，歌单）
  - [x] 收藏歌曲
  - [x] 收藏歌单

  ### mv部分
  - [x] mv播放器
  - [x] 暂停与播放
  - [x] 点击，拖拽进度条改变进度
  - [x] 播放器全屏
  - [x] 播放器控制条点击收起或自动收起
  - [x] mv收藏
  - [x] mv评论




# 部分截图


### mv部分

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E7%83%AD%E9%97%A8mv.png" width="187.5" height="406"/> <img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/mv%E8%AF%A6%E6%83%85.png" width="187.5" height="406"/>


### 歌单部分

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%AD%8C%E5%8D%95%E8%AF%A6%E6%83%85.png" width="187.5" height="406"/> <img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E8%AF%84%E8%AE%BA.png" width="187.5" height="406"/>



### 我的音乐部分

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%88%91%E7%9A%84%E9%9F%B3%E4%B9%90.png" width="187.5" height="406"/> <img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%9C%80%E8%BF%91%E6%92%AD%E6%94%BE.png" width="187.5" height="406"/>

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%94%B6%E8%97%8F%E6%AD%8C%E6%9B%B2.png" width="187.5" height="406"/> <img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%94%B6%E8%97%8F%E6%AD%8C%E5%8D%95.png" width="187.5" height="406"/>

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%94%B6%E8%97%8Fmv.png" width="187.5" height="406"/>


### 搜索部分

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%90%9C%E7%B4%A2.png" width="187.5" height="406"/> <img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C.png" width="187.5" height="406"/>


### 首页部分

<img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%8E%A8%E8%8D%90%E6%AD%8C%E5%8D%95%E4%B8%8Emv.png" width="187.5" height="406"/> <img src="https://github.com/orz23333/vue-cloud-music/blob/gh-pages/static/images/%E6%8E%92%E8%A1%8C%E6%A6%9C.png" width="187.5" height="406"/>


### 项目目录
```
├─build                       // webpack配置文件
├─config                      // 项目开发环境配置相关代码
├─dist                        // 项目打包目录
├─src                         // 源码目录
│  ├─api                      // axios请求，获取项目数据
│  ├─base                     // 项目基础组件
│  │  ├─confirm               // 确认框组件
│  │  ├─list-bar              // Mv或者歌单列表项
│  │  ├─loading               // 初始加载过渡组件
│  │  ├─no-result             // 显示无结果组件
|  |  ├─progress-bar          // 进度条组件
|  |  ├─recommend             // 推荐组件
│  │  ├─scroll                // 页面滚动组件
|  |  ├─search-list           // 搜索列表项组件 
|  |  ├─slider                // 轮播图组件
│  │  └─song-list             // 歌曲列表项组件
│  │  
│  ├─common                   // 公共资源
│  │  ├─fonts                 // 图标字体
│  │  ├─image                 // 图片资源
│  │  ├─js                    // 公共方法
│  │  └─stylus                // css样式
│  ├─components               // 业务组件
│  │  ├─bottom-bar            // 底部操作栏组件
│  │  ├─comments              // 评论组件
│  │  ├─comments-page         // 增加显示的评论组件
│  │  ├─cvedio                // mv列表组件
│  │  ├─disc                  // 歌单组件
│  │  ├─favorite-disc         // 收藏歌单组件
│  │  ├─favorite-mv           // 收藏mv组件
│  │  ├─favorite-song         // 收藏歌曲组件
│  │  ├─header                // 页头组件
│  │  ├─music                 // 音乐组件
│  │  ├─mvplayer              // mv播放器组件
│  │  ├─play-history          // 播放历史组件
│  │  ├─player                // 音乐播放器组件
│  │  ├─playlist              // 播放列表组件
│  │  ├─rank                  // 排行榜组件
│  │  ├─search-***            // 具体搜索项组件
│  │  ├─song-history          // 播放历史组件
│  │  ├─suggest               // 搜索推荐组件
│  │  └─tab                   // 卡片组件
│  ├─pages                    // 页面集合
|  |  ├─findmusic             // 发现音乐页面  
|  |  ├─mv                    // 推荐mv页面 
|  |  ├─mymusic               // 我的音乐页面
|  |  └─search                // 搜索页面
|  ├─router                   // vue-router路由管理
│  └─store                    // vuex状态管理
└─static
```