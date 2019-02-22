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

const FavoriteSong = (resolve) => {
  import('components/favorite-song/favorite-song').then((module) => {
    resolve(module)
  })
}

const FavoriteDisc = (resolve) => {
  import('components/favorite-disc/favorite-disc').then((module) => {
    resolve(module)
  })
}

const FavoriteMv = (resolve) => {
  import('components/favorite-mv/favorite-mv').then((module) => {
    resolve(module)
  })
}

const PlayHistory = (resolve) => {
  import('components/play-history/play-history').then((module) => {
    resolve(module)
  })
}

const SongHistory = (resolve) => [
  import('components/song-history/song-history').then(module => {
    resolve(module)
  })
]

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
      component: MyMusic,
      children: [{
          path: 'favoriteSong',
          component: FavoriteSong
        },
        {
          path: 'favoriteDisc',
          component: FavoriteDisc,
          children: [{
            path: ':id',
            component: Disc
          }]
        },
        {
          path: 'favoriteMv',
          component: FavoriteMv,
        },
        {
          path: 'playHistory',
          component: PlayHistory,
          children: [{
              path: 'disc',
              component: Disc
            },
            {
              path: 'songHistory',
              component: SongHistory
            }
          ]
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
