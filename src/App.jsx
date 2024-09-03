import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Auth/Login'
import DefaultLayout from './layout/DefaultLayout'
import Register from './page/Auth/Register'
import Driver from './components/Driver'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'bus-routes', element: <Driver /> }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
