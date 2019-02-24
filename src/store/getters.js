export const mvId = state => state.mvId

export const playMv = state => state.playMv

export const disc = state => state.disc

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const favoriteDisc = state => state.favoriteDisc

export const favoriteMv = state => state.favoriteMv

export const favoriteSong = state => state.favoriteSong

export const songHistory = state => state.songHistory

export const discHistory = state => state.discHistory

export const showDisc = state => state.showDisc

export const query = state => state.query

export const searchHistory = state => state.searchHistory
