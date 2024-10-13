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
  deleteUser: (userId) => {
    const url = `/user/delete-user/${userId}`
    return axiosClient.delete(url)
  },
  deleteStudent: (userId) => {
    const url = `/user/delete-student/${userId}`
    return axiosClient.delete(url)
  },
  updateUser: (userId, data) => {
    const url = `/user/update-user/${userId}`
    return axiosClient.put(url, data)
  },
  getDetailUser: (userId) => {
    const url = `/user/student/${userId}`
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
  createChildren: (data) => {
    const url = '/user/register-student'
    return axiosClient.post(url, data)
  },
  updateChildren: (userId, data) => {
    const url = `/user/update-student/${userId}`
    return axiosClient.put(url, data)
  }
}

export default userAPI
