import axios from 'axios'

export function getSongComments({id, limit = 20, page = 0}) {
  const url = 'http://localhost:3000/comment/music'

  const data = {
    id,
    limit,
    offset: page * limit
  }

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
}

export function getDiscComments({id, limit = 20, page = 0}) {
  const url = 'http://localhost:3000/comment/playlist'

  const data = {
    id,
    limit,
    offset: page * limit
  }

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
}