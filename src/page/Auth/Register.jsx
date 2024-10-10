import { useState } from 'react'
import { Button, ConfigProvider, Input, Select } from 'antd'
import _ from 'lodash'
import userAPI from '~/api/userAPI'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()

  const defaultUserValue = {
    fullName: '',
    phone: '',
    address: '',
    password: '',
    role: ''
  }
  const [userValue, setUserValue] = useState(defaultUserValue)

  const handleChangeInput = (name, value) => {
    const _userValue = _.cloneDeep(userValue)
    _userValue[name] = value
    setUserValue(_userValue)
  }

  const handleRegister = async () => {
    try {
      await userAPI.signUp(userValue)
      toast.success('Đăng ký thành công')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='container'>
        <div className='p-8 size-2/6 mx-auto'>
          <div className='mb-2'>
            <span className='text-sm'>Họ và Tên</span>
            <Input onChange={(e) => handleChangeInput('fullName', e.target.value)} />
          </div>
          <div className='mb-4'>
            <span className='text-sm'>Số điện thoại</span>
            <Input onChange={(e) => handleChangeInput('phone', e.target.value)} />
          </div>
          <div className='mb-4'>
            <span className='text-sm'>Địa chỉ</span>
            <Input onChange={(e) => handleChangeInput('address', e.target.value)} />
          </div>
          <div className='mb-4'>
            <span className='text-sm'>Mật khẩu</span>
            <Input.Password onChange={(e) => handleChangeInput('password', e.target.value)} />
          </div>
          <div className='mb-4'>
            <span className='text-sm'>Chức vụ</span>
            <Select
              className='w-full'
              onChange={(value) => handleChangeInput('role', value)}
              options={[
                {
                  value: 'Phụ huynh',
                  label: 'Phụ huynh'
                },
                {
                  value: 'Tài xế',
                  label: 'Tài xế'
                }
              ]}
            />
          </div>
          <ConfigProvider wave={{ disabled: true }}>
            <Button className='w-full' type='primary' onClick={handleRegister}>
              Đăng ký
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </>
  )
}

export default Register
