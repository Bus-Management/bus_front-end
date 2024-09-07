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
  }
}

export default userAPI
