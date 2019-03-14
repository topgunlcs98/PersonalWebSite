import axios from 'axios'

// Create an instance using the config defaults provided by the library
const instance = axios.create({
  baseURL: 'http://localhost:4000',
  // timeout: 1000 * 8,
  validateStatus(status) {
    return status < 300 || status === 304
  }
})

// Add a request interceptor
instance.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})
if (typeof window.sessionStorage.token !== 'undefined') {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('token')
}
// Add a response interceptor
instance.interceptors.response.use((res) => {
  // Do something with response data
  // console.log(res)
  return res
}, (error) => {
  // Do something with response error
  // return Promise.reject(err)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = error.response
    switch (status) {
      case 500:
        break
      default:
        break
    }
    throw error
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.warn('Network error', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.warn('Error', error.message)
    throw error
  }
  // console.log(error.config)
})

export default instance
