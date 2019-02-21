import axios from 'axios'
import { RES_OK } from 'api/config'

export function getMvList(offset = 0, limit = 30) {
  const url = 'http://localhost:3000/top/mv'

  return axios
    .get(url, {
      params: { limit, offset: offset * limit }
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getMvDetail(id) {
  const url = 'http://localhost:3000/mv/detail?mvid=' + id

  return axios
    .get(url, {
      params: {}
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}


export function getMvComments({id, limit = 20, page = 0}) {
  const url = 'http://localhost:3000/comment/mv'

  let data = {
    id,
    limit,
    offset: limit * page
  }

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
