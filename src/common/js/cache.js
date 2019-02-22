import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 100

const PLAY_DISC_KEY = '__playDisc__'
const PLAY_DISC_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

const FAVORITE_MV_KEY = '__favoriteMv__'
const FAVORITE_MV_MAX_LEN = 200

const FAVORITE_DISC_KEY = '__favoriteDisc__'
const FAVORITE_DISC_MAX_LEN = 200

const PLAYLIST_KEY = '__playList__';
const SEQUENCE_LIST_KEY = '__sequenceList__';
const CURRENT_INDEX = '__currentIndex__';

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

//保存上次播放的数据，以便打开就能返回上次播放的列表
export function savePlaylist(list) {
  storage.set(PLAYLIST_KEY, list)
}

export function saveSequenceList(list) {
  storage.set(SEQUENCE_LIST_KEY, list)
}

export function saveCurrentIndex(index) {
  storage.set(CURRENT_INDEX, index)
}

export function loadPlaylist() {
  return storage.get(PLAYLIST_KEY, [])
}

export function loadSequenceList() {
  return storage.get(SEQUENCE_LIST_KEY, [])
}

export function loadCurrentIndex() {
  return storage.get(CURRENT_INDEX, -1)
}

//关于搜索历史部分的操作
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

//保存播放歌曲历史
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function savePlayDisc(disc) {
  let discs = storage.get(PLAY_DISC_KEY, [])
  insertArray(discs, disc, (v) => {
    return v.id == disc.id
  }, PLAY_DISC_MAX_LEN)
  storage.set(PLAY_DISC_KEY, discs)
  return discs
}

export function loadPlayDisc() {
  return storage.get(PLAY_DISC_KEY, [])
}

//收藏歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

//收藏mv
export function saveFavoriteMv(mv) {
  let mvs = storage.get(FAVORITE_MV_KEY, [])
  insertArray(mvs, mv, (item) => {
    return mv.id === item.id
  }, FAVORITE_MV_MAX_LEN)
  storage.set(FAVORITE_MV_KEY, mvs)
  return mvs
}

export function deleteFavoriteMv(mv) {
  let mvs = storage.get(FAVORITE_MV_KEY, [])
  deleteFromArray(mvs, (item) => {
    return item.id === mv.id
  })
  storage.set(FAVORITE_MV_KEY, mvs)
  return mvs
}

export function loadFavoriteMv() {
  return storage.get(FAVORITE_MV_KEY, [])
}

//收藏歌单
export function saveFavoriteDisc(disc) {
  let discs = storage.get(FAVORITE_DISC_KEY, [])
  insertArray(discs, disc, (item) => {
    return disc.id === item.id
  }, FAVORITE_DISC_MAX_LEN)
  storage.set(FAVORITE_DISC_KEY, discs)
  return discs
}

export function deleteFavoriteDisc(disc) {
  let discs = storage.get(FAVORITE_DISC_KEY, [])
  deleteFromArray(discs, (item) => {
    return item.id === disc.id
  })
  storage.set(FAVORITE_DISC_KEY, discs)
  return discs
}

export function loadFavoriteDisc() {
  return storage.get(FAVORITE_DISC_KEY, [])
}
