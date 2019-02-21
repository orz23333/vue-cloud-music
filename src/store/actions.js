import * as types from './mutation-types'
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
import {
  saveFavorite,
  deleteFavorite,
  saveFavoriteMv,
  deleteFavoriteMv,
  saveFavoriteDisc,
  deleteFavoriteDisc,
  savePlayDisc,
  savePlay
} from "common/js/cache";

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

//播放mv操作
export const playMv = function({commit, state}, id) {
  commit(types.SET_PLAYMV, true)
  commit(types.SET_MVID, id)
}

//disc列表中，播放音乐操作
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//改变播放模式操作
export const changeMode = function ({commit, state}) {
      const mode = (state.mode + 1) % 3 
      commit(types.SET_PLAY_MODE, mode)

      let list = null
      let id = state.playlist[state.currentIndex].id
      if (mode === playMode.random) {
        list = shuffle(state.sequenceList)
      } else {
        list = state.sequenceList
      }
      commit(types.SET_PLAYLIST, list)
      
      
      let index = list.findIndex(item => {
        return item.id === id
      })
      commit(types.SET_CURRENT_INDEX, index)
}

//播放列表的删除一首歌的操作
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

//播放列表的删除全部操作
export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}


//关于收藏部分的actions
export const saveFS = function ({commit}, song) {
  commit(types.SET_FAVORITE_SONG, saveFavorite(song))
}

export const deleteFS = function ({commit}, song) {
  commit(types.SET_FAVORITE_SONG, deleteFavorite(song))
}

export const saveFM = function ({commit}, mv) {
  commit(types.SET_FAVORITE_MV, saveFavoriteMv(mv))
}

export const deleteFM = function ({commit}, mv) {
  commit(types.SET_FAVORITE_MV, deleteFavoriteMv(mv))
}

export const saveFD = function ({commit}, disc) {
  commit(types.SET_FAVORITE_DISC, saveFavoriteDisc(disc))
}

export const deleteFD = function ({commit}, disc) {
  commit(types.SET_FAVORITE_DISC, deleteFavoriteDisc(disc))
}

//关于播放历史部分的actions
export const saveSongHistory = function ({commit}, song) {
  commit(types.SET_SONG_HISTORY, savePlay(song))
}

export const saveDiscHistory = function ({commit}, disc) {
  commit(types.SET_DISC_HISTORY, savePlayDisc(disc))
}
