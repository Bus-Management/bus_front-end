import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import ModalChildren from './ModalChildren/ModalChildren'
import ModalDelete from '~/components/ModalDelete'

function Children() {
  const [listChildrens, setListChildrens] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [dataDeleteUser, setDataDeleteUser] = useState({})
  const [dataUpdateUser, setDataUpdateUser] = useState({})
  const [actionModal, setActionModal] = useState('CREATE')

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setActionModal('CREATE')
  }

  const handleOpenModalDelete = (data) => {
    setIsModalDeleteOpen(true)
    setDataDeleteUser(data)
  }

  const handleOpenModalUpdate = (data) => {
    setIsModalOpen(true)
    setDataUpdateUser(data)
    setActionModal('UPDATE')
  }

  const fetchListChildrens = async () => {
    try {
      const res = await userAPI.getAllChildrens()
      setListChildrens(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchListChildrens()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-4'>
          <Button type='primary' className='mb-4' onClick={handleOpenModal}>
            Tạo thông tin
          </Button>
          <div className='grid grid-cols-3 gap-4'>
            {listChildrens?.length > 0 &&
              listChildrens.map((item) => {
                return (
                  <>
                    <div className='p-4 rounded-lg flex flex-col cursor-pointer shadow-lg '>
                      <div className='flex gap-4 items-center mb-2'>
                        <img src={item.avatar || '/no-user.png'} alt='' className='size-16 rounded-full bg-contain' />
                        <span className='font-medium'>{item.fullName}</span>
                        <div>
                          <EditOutlined className='text-yellow-500 text-lg cursor-pointer mr-4' onClick={() => handleOpenModalUpdate(item)} />
                          <DeleteOutlined className='text-red-500 text-lg cursor-pointer' onClick={() => handleOpenModalDelete(item)} />
                        </div>
                      </div>
                      <div>
                        <p>
                          <span>
                            <b>Tuổi: </b>
                          </span>
                          <span>{item.age}</span>
                        </p>
                        <p>
                          <span>
                            <b>Lớp: </b>
                          </span>
                          <span>{item.class}</span>
                        </p>
                      </div>
                    </div>
                  </>
                )
              })}
          </div>
        </div>
      </div>
      <ModalChildren isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} action={actionModal} fetchListChildrens={fetchListChildrens} dataUpdateUser={dataUpdateUser} />
      <ModalDelete isModalOpen={isModalDeleteOpen} setIsModalOpen={setIsModalDeleteOpen} data={dataDeleteUser} fetchListChildrens={fetchListChildrens} />
    </>
  )
}

export default Children
