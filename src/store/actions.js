import * as types from './mutation-types'
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const playMv = function({commit, state}, id) {
  commit(types.SET_PLAYMV, true)
  commit(types.SET_MVID, id)
}

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
