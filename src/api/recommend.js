import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

export function getRecommend() {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getRecommendDisc() {
  const url = 'http://localhost:3000/personalized'

  return axios
    .get(url, {
      params: {}
    })
    .then(res => {
      return Promise.resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
}

export function getRecommendMv() {
  const url = 'http://localhost:3000/personalized/mv'

  return axios
    .get(url, {
      params: {}
    })
    .then(res => {
      return Promise.resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
}

export function getDiscList(id) {
  const url = 'http://localhost:3000/playlist/detail'

  const data = {
    id
  }

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
