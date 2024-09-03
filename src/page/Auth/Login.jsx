import { Button, ConfigProvider, Input } from 'antd'
import { useState } from 'react'

function Login() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    try {
    } catch (error) {}
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
