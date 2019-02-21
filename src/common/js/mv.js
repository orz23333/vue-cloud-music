import { getMvDetail } from "api/mv";
import { RES_OK } from "api/config";

export class Mv {
  constructor({
    id,
    name,
    copywriter,
    picUrl,
    duration,
    playCount,
    artistName,
    artistId,
    cover,
    lastRank
  }) {
    this.id = id
    this.name = name
    this.copywriter = copywriter
    this.picUrl = picUrl
    this.duration = duration
    this.playCount = playCount
    this.artistName = artistName
    this.artistId = artistId
    this.cover = cover
    this.lastRank = lastRank
  }

  _getMvDetail(id) {
    getMvDetail(this.id).then(res => {
      if (res.code === RES_OK) {
        let data = res.data
        this.desc = data.desc
        this.playCount = data.playCount
        this.subCount = data.subCount
        this.shareCount = data.shareCount
        this.commentCount = data.commentCount
        this.duration = data.duration
        this.brs = _getSrc(data.brs)

        return Promise.resolve()
      }
    })
  }

  _getSrc(o) {
    let keys = Object.keys(o);

    keys = keys.map(v => {
      +v
    })

    let max = Math.max(...keys)

    return o[max]
  }
}
