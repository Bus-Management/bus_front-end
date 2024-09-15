import axiosClient from '~/api/axiosClient'

const userAPI = {
  signUp: (data) => {
    const url = '/user/sign-up'
    return axiosClient.post(url, data)
  },
  deleteUser: (userId) => {
    const url = `/user/delete-user/${userId}`
    return axiosClient.delete(url)
  },
  updateUser: (userId, data) => {
    const url = `/user/update-user/${userId}`
    return axiosClient.put(url, data)
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
  getAllChildrens: () => {
    const url = '/user/children'
    return axiosClient.get(url)
  },
  getAllParents: () => {
    const url = '/user/parent'
    return axiosClient.get(url)
  },

  createBusRoute: (data) => {
    const url = '/user/create-route'
    return axiosClient.post(url, data)
  },
  createChildren: (data) => {
    const url = '/user/register-student'
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
