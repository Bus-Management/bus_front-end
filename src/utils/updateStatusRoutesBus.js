import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'

const updateStatusRoutesBus = async (res, setListRoutesBus) => {
  try {
    const currentDate = new Date().toLocaleString().split(',')[0]

    const updatedRoutes = res.map((route) => {
      const startDate = new Date(route.start_day).toLocaleString().split(',')[0]
      let status = route.status
      if (startDate > currentDate) {
        status = 'upcoming'
      } else if (startDate === currentDate && !route.end_day) {
        status = 'progressing'
      }

      if (status !== route.status) {
        busRouteAPI.updateStatusBusRoute({ routeId: route.id, status })
      }
      if (status && route.end_day) {
        busRouteAPI.updateStatusBusRoute({ routeId: route.id, status: 'completed' })
      }

      return { ...route, status }
    })
    setListRoutesBus(updatedRoutes)
  } catch (error) {
    toast.error(error.response.data.message)
  }
}
export default updateStatusRoutesBus
