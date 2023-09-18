import axios from 'axios'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if ('request' in error) delete (error as any).request
    if ('response' in error) delete (error as any).response?.request
    return Promise.reject(error)
  },
)
