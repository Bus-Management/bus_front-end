import axiosClient from './axiosClient'

const busRouteAPI = {
  createBusRoute: (data) => {
    const url = '/bus-route/create-route'
    return axiosClient.post(url, data)
  },
  getAllBusRoutes: () => {
    const url = '/bus-route'
    return axiosClient.get(url)
  },
  getAllRoutesCompleted: () => {
    const url = '/bus-route/route-completed'
    return axiosClient.get(url)
  },
  getRoutesAssignedStudent: () => {
    const url = '/bus-route/assigned-student'
    return axiosClient.get(url)
  },
  getDetailBusRoute: (routeId) => {
    const url = `/bus-route/detail/${routeId}`
    return axiosClient.get(url)
  },
  updateBusRoute: (routeId, data) => {
    const url = `/bus-route/${routeId}`
    return axiosClient.put(url, data)
  },
  updateStatusBusRoute: (data) => {
    const url = '/bus-route/update-route-status'
    return axiosClient.put(url, data)
  },
  assignRoute: (data) => {
    const url = '/bus-route/register-route'
    return axiosClient.post(url, data)
  },
  unAssignRoute: (data) => {
    const url = '/bus-route/unregister-route'
    return axiosClient.post(url, data)
  },
  deleteBusRoute: (routeId) => {
    const url = `/bus-route/delete-bus-route/${routeId}`
    return axiosClient.delete(url)
  },
  getListRoutesBus: (driverId) => {
    const url = `/bus-route/driver/${driverId}/assigned-route`
    return axiosClient.get(url)
  },
  getRoutesDriverCompleted: (driverId) => {
    const url = `/bus-route/driver-completed/${driverId}`
    return axiosClient.get(url)
  },
  updateCompletedRoute: (data) => {
    const url = '/bus-route/complete'
    return axiosClient.put(url, data)
  }
}

export default busRouteAPI
