import axiosClient from '~/api/axiosClient'

const userAPI = {
  signUp: (data) => {
    const url = '/user/sign-up'
    return axiosClient.post(url, data)
  },
  getListRoutesBus: (driverId) => {
    const url = `/user/driver/${driverId}/assigned-route`
    return axiosClient.get(url)
  },
  getDetailUser: (userId) => {
    const url = `/user/student/${userId}`
    return axiosClient.get(url)
  }
}

export default userAPI
