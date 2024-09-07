import { TruckOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { AuthContext } from '~/context/AuthContext'

function Home() {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to='/login' />
  } else {
    return (
      <>
        <div className='container mt-2'>
          <div className='flex items-center'>
            <img src='/no-user.png' alt='' className='h-20 rounded-full mr-2' />
            <span className='text-xl font-medium'>Nguyen Dat</span>
          </div>
          {/* --------Các dịch vụ */}
          <div className='grid grid-cols-3 gap-4'>
            <NavLink to='/bus-routes'>
              <div className='bg-blue-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                <span className='text-4xl  mb-4'>
                  <TruckOutlined />
                </span>
                <span className='text-xl'>Tuyến đường được phân công</span>
              </div>
            </NavLink>
          </div>
        </div>
      </>
    )
  }
}

export default Home
