import {
  playMode
} from 'common/js/config'

import {
  loadPlay,
  loadPlaylist,
  loadPlayDisc,
  loadSequenceList,
  loadCurrentIndex,
  loadFavorite,
  loadFavoriteMv,
  loadFavoriteDisc
} from "common/js/cache";

const state = {
  playMv: false,
  mvId: 0,
  disc: 0,
  playing: false,
  fullScreen: false,
  showDisc: false,
  playlist: loadPlaylist(),
  sequenceList: loadSequenceList(),
  mode: playMode.sequence,
  currentIndex: loadCurrentIndex(),
  songHistory: loadPlay(),
  discHistory: loadPlayDisc(),
  favoriteSong: loadFavorite(),
  favoriteMv: loadFavoriteMv(),
  favoriteDisc: loadFavoriteDisc()
}

export default state
