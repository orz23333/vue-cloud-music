import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mvId, singer, name, album, duration, image, alia}) {
    this.id = id
    this.mvId = mvId
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.alia = alia
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    name: musicData.name,
    singer: filterSinger(musicData.ar),    
    album: musicData.al.name,
    duration: musicData.dt,
    mvId: musicData.mv,
    image: musicData.al.picUrl,
    alia: musicData.alia.join('/')
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

