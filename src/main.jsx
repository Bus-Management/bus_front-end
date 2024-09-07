import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    <ToastContainer position='top-right' autoClose={1000} hideProgressBar />
  </>
)
