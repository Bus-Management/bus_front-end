import axiosClient from './axiosClient'

const busAPI = {
  createBus: (data) => {
    const url = '/bus'
    return axiosClient.post(url, data)
  },
  getAllBus: () => {
    const url = '/bus'
    return axiosClient.get(url)
  },
  deleteBus: (id) => {
    const url = `/bus/${id}`
    return axiosClient.delete(url)
  },
  detailBus: (id) => {
    const url = `/bus/${id}`
    return axiosClient.get(url)
  }
}
export default busAPI
