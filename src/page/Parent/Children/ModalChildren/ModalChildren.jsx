import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Modal, Upload, message } from 'antd'
import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import { AuthContext } from '~/context/AuthContext'

import handleUploadImage from '~/utils/handleUploadImage'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
function ModalChildren({ isModalOpen, setIsModalOpen, action, dataUpdateUser, fetchListChildrens }) {
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const dataUserDefault = {
    fullName: '',
    age: '',
    class: '',
    address: '',
    avatar: '',
    parentId: ''
  }
  const [dataUser, setDataUser] = useState(dataUserDefault)

  const handleOk = async () => {
    setIsModalOpen(false)
    try {
      const res =
        action === 'CREATE'
          ? await userAPI.createChildren({ ...dataUser, parentId: currentUser.id })
          : await userAPI.updateUser(dataUser.id, { ...dataUser, parentId: currentUser.id, role: 'Học sinh' })
      toast.success(res.message)
      setDataUser(dataUserDefault)
      fetchListChildrens()
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setImageUrl('')
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </button>
  )

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    getBase64(info.file.originFileObj, async (url) => {
      setLoading(false)
      setImageUrl(url)
      const secure_url = await handleUploadImage(url)
      setDataUser({ ...dataUser, avatar: secure_url })
    })
  }

  const handleChangeInput = (name, value) => {
    const _dataUser = _.cloneDeep(dataUser)
    _dataUser[name] = value
    setDataUser(_dataUser)
  }

  useEffect(() => {
    setDataUser(dataUpdateUser)
    setImageUrl(dataUpdateUser.avatar || 'no-user.png')
  }, [dataUpdateUser])

  return (
    <>
      <Modal title={action === 'CREATE' ? 'Tạo thông tin học sinh' : 'Sửa thông tin học sinh'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='grid grid-cols-2 gap-4'>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            status='error'
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt='avatar'
                style={{
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <div>
            <span>Tên</span>
            <Input value={dataUser.fullName} onChange={(e) => handleChangeInput('fullName', e.target.value)} />
          </div>
          <div>
            <span>Tuổi</span>
            <Input value={dataUser.age} onChange={(e) => handleChangeInput('age', e.target.value)} />
          </div>
          <div>
            <span>Lớp</span>
            <Input value={dataUser.class} onChange={(e) => handleChangeInput('class', e.target.value)} />
          </div>
          <div className='col-span-2'>
            <span>Địa chỉ</span>
            <Input value={dataUser.address} onChange={(e) => handleChangeInput('address', e.target.value)} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalChildren
