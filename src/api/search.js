import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'http://localhost:3000/search/hot'

  return axios
    .get(url, {
      params: {}
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function search(keywords, type = 1, page = 0, limit = 30) {
  const url = 'http://localhost:3000/search'

  let data = {
    keywords,
    type,
    limit,
    offset: page * limit
  }

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })

}
