import { Button, Table } from 'antd'
import ModalBus from './ModalBus/ModalBus'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busAPI from '~/api/busAPI'
import { DeleteOutlined } from '@ant-design/icons'
import ModalDelete from '~/components/ModalDelete'

function Bus() {
  const columns = [
    {
      title: 'ID Xe',
      dataIndex: 'id'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'license_plate'
    },
    {
      title: 'Số lượng học sinh',
      dataIndex: 'capacity'
    },
    {
      title: 'Tuyến đường',
      dataIndex: 'route_name'
    },
    {
      title: 'Tài xế',
      dataIndex: 'driver_name'
    },

    {
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48'>
            {/* <EyeOutlined className='text-green-500 text-2xl cursor-pointer mr-4' onClick={() => handleShowModalDetail(data)} />
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' onClick={() => handleShowModalUpdate(data)} />
              */}
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' onClick={() => handleShowModalDelete(data)} />
          </div>
        )
      }
    }
  ]

  const [isOpenModalBus, setIsOpenModalBus] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [listBus, setListBus] = useState([])
  const [dataModal, setDataModal] = useState({})

  const handleCreateBus = () => {
    setIsOpenModalBus(true)
  }
  const handleShowModalDelete = (data) => {
    setIsOpenModalDelete(true)
    setDataModal(data)
  }

  const fetchListBus = async () => {
    try {
      const res = await busAPI.getAllBus()
      setListBus(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchListBus()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-4'>
          <Button type='primary' className='mb-4' onClick={handleCreateBus}>
            Tạo mới xe bus
          </Button>
          <Table columns={columns} dataSource={listBus} />
        </div>
      </div>
      <ModalBus isOpen={isOpenModalBus} setIsOpen={setIsOpenModalBus} />
      <ModalDelete isModalOpen={isOpenModalDelete} setIsModalOpen={setIsOpenModalDelete} data={dataModal} fetchListBus={fetchListBus} />
    </>
  )
}

export default Bus
