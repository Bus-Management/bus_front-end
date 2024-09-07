import { DoubleRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import { AuthContext } from '~/context/AuthContext'

function Header() {
  const { currentUser, updateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      const res = await userAPI.logOut()
      toast.success(res.message)
      updateUser(null)
      navigate('/')
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <>
      <div className=' bg-blue-500 '>
        <div className='container text-white'>
          <div className='h-14 flex justify-between items-center'>
            <NavLink to='/'>
              <p className='font-medium text-xl flex items-center cursor-pointer'>
                <DoubleRightOutlined className='mr-2 text-2xl h-4' />
                <span>NINO BUS</span>
              </p>
            </NavLink>
            <div>
              <span className='mr-2'>0989898989</span>
              {currentUser && <Button onClick={handleLogOut}>Đăng xuất</Button>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
