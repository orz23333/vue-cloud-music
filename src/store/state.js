import {
  playMode
} from 'common/js/config'

import {
  loadPlaylist,
  loadSequenceList,
  loadCurrentIndex
} from "common/js/cache";

const state = {
  playMv: false,
  mvId: 0,
  disc: 0,
  playing: false,
  fullScreen: false,
  playlist: loadPlaylist(),
  sequenceList: loadSequenceList(),
  mode: playMode.sequence,
  currentIndex: loadCurrentIndex()

}

export default state
