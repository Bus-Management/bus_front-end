import { Input, Modal, Select } from 'antd'
import _ from 'lodash'
import { useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

function ModalUser({ isOpen, setIsModalUserOpen, fetchAllUsers }) {
  const dataUserDefault = {
    fullName: '',
    age: '',
    phone: '',
    password: '',
    address: '',
    role: ''
  }
  const [dataUser, setDataUser] = useState(dataUserDefault)

  const handleOk = async () => {
    setIsModalUserOpen(false)
    try {
      await userAPI.signUp(dataUser)
      toast.success('Tạo người dùng thành công')
      fetchAllUsers()
      setDataUser(dataUserDefault)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancel = () => {
    setIsModalUserOpen(false)
    setDataUser(dataUserDefault)
  }

  const handleChangeInput = (name, value) => {
    let _dataUser = _.cloneDeep(dataUser)
    _dataUser[name] = value
    setDataUser(_dataUser)
  }

  return (
    <>
      <Modal title='Tạo mới người dùng' open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='mb-2'>
          <span>Tên người dùng</span>
          <Input onChange={(e) => handleChangeInput('fullName', e.target.value)} />
        </div>
        <div className='mb-2'>
          <span>Tuổi</span>
          <Input onChange={(e) => handleChangeInput('age', e.target.value)} />
        </div>
        <div className='mb-2'>
          <span>Địa chỉ</span>
          <Input onChange={(e) => handleChangeInput('address', e.target.value)} />
        </div>
        <div className='mb-2'>
          <span>Số điện thoại</span>
          <Input onChange={(e) => handleChangeInput('phone', e.target.value)} />
        </div>
        <div className='mb-2'>
          <span>Mật khẩu</span>
          <Input.Password onChange={(e) => handleChangeInput('password', e.target.value)} />
        </div>
        <div className='mb-2'>
          <span>Chức vụ</span>
          <Select
            placeholder='Vui lòng chọn chức vụ'
            onChange={(value) => handleChangeInput('role', value)}
            options={[
              {
                value: 'Tài xế',
                label: 'Tài xế'
              },
              {
                value: 'Phụ huynh',
                label: 'Phụ huynh'
              }
            ]}
            className='w-full'
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalUser
