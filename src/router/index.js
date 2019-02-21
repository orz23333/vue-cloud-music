import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const FindMusic = (resolve) => {
  import('pages/findmusic/findmusic').then((module) => {
    resolve(module)
  })
}

const Music = (resolve) => {
  import('components/music/music').then((module) => {
    resolve(module)
  })
}

const CVedio = (resolve) => {
  import('components/cvedio/cvedio').then((module) => {
    resolve(module)
  })
}

const MyMusic = (resolve) => {
  import('pages/mymusic/mymusic').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('pages/search/search').then((module) => {
    resolve(module)
  })
}

const Mv = (resolve) => {
  import('pages/mv/mv').then((module) => {
    resolve(module)
  })
}

const Disc = (resolve) => {
  import('components/disc/disc').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}

import Mvplayer from "components/mvplayer/mvplayer";

export default new Router({
  routes: [{
      path: '/',
      redirect: '/findmusic/music'
    },
    {
      path: '/findmusic',
      component: FindMusic,
      children: [{
          path: 'music',
          component: Music,
          children: [{
            path: ':id',
            component: Disc
          }]
        },
        {
          path: 'vedio',
          component: CVedio,
        },
        {
          path: 'hot',
          component: Rank,
          children: [{
            path: ':id',
            component: Disc
          }]
        }
      ]
    },
    {
      path: '/mymusic',
      component: MyMusic
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
