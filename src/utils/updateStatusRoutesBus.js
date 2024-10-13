import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'

const updateStatusRoutesBus = async (res, setListRoutesBus) => {
  try {
    const currentDate = new Date()

    const updatedRoutes = res.map((route) => {
      const startDate = new Date(route.start_day)
      let status = route.status

      if (startDate > currentDate) {
        status = 'upcoming'
      } else if (startDate.toDateString() === currentDate.toDateString()) {
        status = 'progressing'
      } else if (startDate < currentDate) {
        status = 'completed'
      }

      if (status !== route.status) {
        busRouteAPI.updateStatusBusRoute({ routeId: route.id, status })
      }

      return { ...route, status }
    })
    setListRoutesBus(updatedRoutes)
  } catch (error) {
    toast.error(error.response.data.message)
  }
}
export default updateStatusRoutesBus
