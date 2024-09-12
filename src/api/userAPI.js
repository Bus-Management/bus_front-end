import axiosClient from '~/api/axiosClient'

const userAPI = {
  signUp: (data) => {
    const url = '/user/sign-up'
    return axiosClient.post(url, data)
  },
  logIn: (data) => {
    const url = '/user/login'
    return axiosClient.post(url, data)
  },
  logOut: () => {
    const url = '/user/logout'
    return axiosClient.post(url)
  },
  getListRoutesBus: (driverId) => {
    const url = `/user/driver/${driverId}/assigned-route`
    return axiosClient.get(url)
  },
  getDetailUser: (userId) => {
    const url = `/user/student/${userId}`
    return axiosClient.get(url)
  },
  getAllBusRoutes: () => {
    const url = '/user/bus-route'
    return axiosClient.get(url)
  },
  getAllDrivers: () => {
    const url = '/user/driver'
    return axiosClient.get(url)
  },
  createBusRoute: (data) => {
    const url = '/user/create-route'
    return axiosClient.post(url, data)
  },
  deleteBusRoute: (routeId) => {
    const url = `/user/delete-bus-route/${routeId}`
    return axiosClient.delete(url)
  },
  updateBusRoute: (routeId, data) => {
    const url = `/user/bus-route/${routeId}`
    return axiosClient.put(url, data)
  }
}

export default userAPI
