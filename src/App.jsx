import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Auth/Login'
import DefaultLayout from './layout/DefaultLayout'
import Register from './page/Auth/Register'
import Driver from './page/Driver'
import BusRoute from '~/page/Admin/BusRoute'
import User from '~/page/Admin/User'
import Children from './page/Parent/Children'
import AssignBusRoute from './page/Parent/AssignBusRoute'
import Bus from './page/Admin/Bus'
import Schedule from './page/Parent/Schedule'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'bus-routes', element: <Driver /> },
        { path: 'childrens', element: <Children /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'register-route/:childrenId', element: <AssignBusRoute /> },
        { path: 'admin/bus-routes', element: <BusRoute /> },
        { path: 'admin/users', element: <User /> },
        { path: 'admin/bus', element: <Bus /> }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
