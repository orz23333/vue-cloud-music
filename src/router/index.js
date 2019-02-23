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

const SearchSong = (resolve) => [
  import('components/search-song/search-song').then(module => {
    resolve(module)
  })
]

const SearchSinger = (resolve) => [
  import('components/search-singer/search-singer').then(module => {
    resolve(module)
  })
]

const SearchDisc = (resolve) => [
  import('components/search-disc/search-disc').then(module => {
    resolve(module)
  })
]

const SearchMv = (resolve) => [
  import('components/search-mv/search-mv').then(module => {
    resolve(module)
  })
]

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
          component: Music
        },
        {
          path: 'vedio',
          component: CVedio,
        },
        {
          path: 'hot',
          component: Rank,
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
        },
        {
          path: 'favoriteMv',
          component: FavoriteMv,
        },
        {
          path: 'playHistory',
          component: PlayHistory,
          children: [{
            path: 'songHistory',
            component: SongHistory
          }]
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      // redirect: '/search/song',
      // children: [{
      //     path: 'song',
      //     component: SearchSong,
      //   },
      //   {
      //     path: 'singer',
      //     component: SearchSinger,
      //   },
      //   {
      //     path: 'disc',
      //     component: SearchDisc,
      //   },
      //   {
      //     path: 'mv',
      //     component: SearchMv,
      //   }
      // ]
    }
  ]
})
