import { Button, ConfigProvider, Input } from 'antd'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

import { AuthContext } from '~/context/AuthContext'

function Login() {
  const { updateUser } = useContext(AuthContext)

  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await userAPI.logIn({ userName, password })
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
            <span className='text-sm'>Tên đăng nhập</span>
            <Input value={userName} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='mb-4'>
            <span className='text-sm'>Mật khẩu</span>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <ConfigProvider wave={{ disabled: true }}>
            <Button className='w-full' type='primary' onClick={handleLogin}>
              Đăng nhập
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </>
  )
}

export default Login
