import { EditOutlined, TruckOutlined, UserOutlined, ApartmentOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { AuthContext } from '~/context/AuthContext'
import ModalParent from './ModalParent/ModalParent'

function Home() {
  const { currentUser } = useContext(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataUser, setDataUser] = useState({})

  const handleEditUser = () => {
    setIsModalOpen(true)
    setDataUser({ ...currentUser })
  }

  if (!currentUser) {
    return <Navigate to='/login' />
  } else {
    return (
      <>
        <div className='container mt-2'>
          <div className='flex items-center my-4'>
            <img src={currentUser.avatar || '/no-user.png'} alt='' className='size-16 object-cover rounded-full mr-2' />
            <span className='text-xl font-medium'>{currentUser.fullName}</span>
            <EditOutlined className='text-yellow-500 text-lg cursor-pointer ml-4' onClick={handleEditUser} />
          </div>
          {/* --------Các dịch vụ */}
          <div className='grid grid-cols-3 gap-4'>
            {currentUser.role === 'driver' && (
              <NavLink to='/bus-routes'>
                <div className='bg-blue-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                  <span className='text-4xl  mb-4'>
                    <TruckOutlined />
                  </span>
                  <span className='text-xl'>Tuyến xe được phân công</span>
                </div>
              </NavLink>
            )}
            {currentUser.role === 'parent' && (
              <>
                <NavLink to='/childrens'>
                  <div className='bg-emerald-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                    <span className='text-4xl  mb-4'>
                      <UserOutlined />
                    </span>
                    <span className='text-xl'>Quản lý thông tin của con</span>
                  </div>
                </NavLink>
              </>
            )}
            {currentUser.role === 'Admin' && (
              <>
                {/* <Map /> */}
                {/* <MapBox /> */}
                <NavLink to='admin/bus-routes'>
                  <div className='bg-blue-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                    <span className='text-4xl mb-4'>
                      <ApartmentOutlined />
                    </span>
                    <span className='text-xl'>Quản lý tuyến xe</span>
                  </div>
                </NavLink>
                <NavLink to='admin/bus'>
                  <div className='bg-rose-500 p-4 rounded-lg text-white flex flex-col cursor-pointer shadow-xl'>
                    <span className='text-4xl  mb-4'>
                      <TruckOutlined />
                    </span>
                    <span className='text-xl'>Quản lý xe bus</span>
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
        <ModalParent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataUser} />
      </>
    )
  }
}

export default Home
