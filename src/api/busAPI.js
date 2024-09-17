import axiosClient from './axiosClient'

const busAPI = {
  createBusRoute: (data) => {
    const url = '/bus/create-route'
    return axiosClient.post(url, data)
  },
  getAllBusRoutes: () => {
    const url = '/bus/bus-route'
    return axiosClient.get(url)
  },
  updateBusRoute: (routeId, data) => {
    const url = `/bus/bus-route/${routeId}`
    return axiosClient.put(url, data)
  },
  assignRoute: (data) => {
    const url = '/bus/register-route'
    return axiosClient.post(url, data)
  },
  unAssignRoute: (data) => {
    const url = '/bus/unregister-route'
    return axiosClient.post(url, data)
  },
  deleteBusRoute: (routeId) => {
    const url = `/bus/delete-bus-route/${routeId}`
    return axiosClient.delete(url)
  },
  getListRoutesBus: (driverId) => {
    const url = `/bus/driver/${driverId}/assigned-route`
    return axiosClient.get(url)
  }
}

export default busAPI
