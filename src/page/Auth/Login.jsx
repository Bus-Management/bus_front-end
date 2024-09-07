import { Button, ConfigProvider, Input } from 'antd'
import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

import { AuthContext } from '~/context/AuthContext'

function Login() {
  const { updateUser } = useContext(AuthContext)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await userAPI.logIn({ phone, password })
      updateUser(res.user)
      toast.success('Đăng nhập thành công !')
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className='container'>
        <div className='p-8 size-2/6 mx-auto'>
          <div className='mb-2'>
            <span className='text-sm'>Số điện thoại</span>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className='mb-4'>
            <span className='text-sm'>Mật khẩu</span>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <ConfigProvider wave={{ disabled: true }}>
            <Button className='w-full' type='primary' onClick={handleLogin}>
              Đăng nhập
            </Button>
            <NavLink to='/register'>
              <Button type='primary' className='!bg-red-600 mt-4 w-full'>
                Đăng ký
              </Button>
            </NavLink>
          </ConfigProvider>
        </div>
      </div>
    </>
  )
}

export default Login
