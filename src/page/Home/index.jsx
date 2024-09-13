import { TruckOutlined, UserOutlined } from '@ant-design/icons'
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
          <div className='flex items-center my-4'>
            <img src='/no-user.png' alt='' className='h-20 rounded-full mr-2' />
            <span className='text-xl font-medium'>{currentUser.fullName}</span>
          </div>
          {/* --------Các dịch vụ */}
          <div className='grid grid-cols-3 gap-4'>
            {currentUser.role === 'Tài xế' && (
              <NavLink to='/bus-routes'>
                <div className='bg-blue-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                  <span className='text-4xl  mb-4'>
                    <TruckOutlined />
                  </span>
                  <span className='text-xl'>Tuyến đường được phân công</span>
                </div>
              </NavLink>
            )}
            {currentUser.role === 'Phụ huynh' && (
              <>
                <div className='bg-emerald-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                  <span className='text-4xl  mb-4'>
                    <UserOutlined />
                  </span>
                  <span className='text-xl'>Đăng ký tài khoản cho con</span>
                </div>
                <NavLink to='/register-route'>
                  <div className='bg-blue-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                    <span className='text-4xl  mb-4'>
                      <TruckOutlined />
                    </span>
                    <span className='text-xl'>Đăng ký tuyến đường cho con</span>
                  </div>
                </NavLink>
              </>
            )}
            {currentUser.role === 'Admin' && (
              <>
                <NavLink to='admin/bus-routes'>
                  <div className='bg-blue-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                    <span className='text-4xl  mb-4'>
                      <TruckOutlined />
                    </span>
                    <span className='text-xl'>Quản lý tuyến đường</span>
                  </div>
                </NavLink>
                <NavLink to='admin/users'>
                  <div className='bg-emerald-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                    <span className='text-4xl  mb-4'>
                      <UserOutlined />
                    </span>
                    <span className='text-xl'>Quản lý người dùng</span>
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Home
