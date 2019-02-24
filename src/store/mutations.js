import * as types from "./mutation-types";

const mutations = {
  [types.SET_MVID](state, mvId) {
    state.mvId = mvId
  },

  [types.SET_PLAYMV](state, isTrue) {
    state.playMv = isTrue
  },

  [types.SET_DISC](state, disc) {
    state.disc = disc
  },

  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },

  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },

  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },

  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },

  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },

  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },

  [types.SET_SONG_HISTORY](state, history) {
    state.songHistory = history
  },

  [types.SET_DISC_HISTORY](state, history) {
    state.discHistory = history
  },

  [types.SET_FAVORITE_MV](state, list) {
    state.favoriteMv = list
  },

  [types.SET_FAVORITE_DISC](state, list) {
    state.favoriteDisc = list
  },

  [types.SET_FAVORITE_SONG](state, list) {
    state.favoriteSong = list
  },

  [types.SET_DISC_SHOW](state, flag) {
    state.showDisc = flag
  },

  [types.SET_QUERY](state, query) {
    state.query = query
  },

  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  }
}

export default mutations
