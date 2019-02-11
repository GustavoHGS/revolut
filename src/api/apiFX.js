import { create } from 'apisauce'
import { FX_API_ENDPOINT } from '../helpers/constants'

const baseURL = `${FX_API_ENDPOINT}/api`

const apiFX = create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiFX.axiosInstance.interceptors.request.use(
  config => config,
  (error) => {
    // TODO:
    // Do something with request error
    return Promise.reject(error)
  },
)


apiFX.axiosInstance.interceptors.response.use(
  response => (
    response
  ), error => (
    new Promise(() => {
      if (error.response) {
        const statusCode = error.response.status
        // if (statusCode === 401) {
        //   // call to login
        //   // return store.dispatch(logout())
        // } else if (statusCode === 403) {
        //   return store.dispatch(refreshUserToken())
        // }
        // return store.dispatch(handleNetworkError(error.response.status, error.response.data))
      }
      return store.dispatch(handleNetworkError(0))
    })
  ))

apiFX.axiosInstance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})
export default apiFX
