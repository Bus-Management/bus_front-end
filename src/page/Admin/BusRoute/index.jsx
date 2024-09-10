import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import ModalBusRoute from './ModalBusRoute/ModalBusRoute'
import ModalDeleteBusRoute from './ModalDeleteBusRoute/ModalDeleteBusRoute'

function Driver() {
  const columns = [
    {
      title: 'ID Tuyến đường',
      dataIndex: 'id'
    },
    {
      title: 'Tên tuyến đường',
      dataIndex: 'route_name'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDay'
    },
    {
      title: 'Điểm bắt đầu',
      dataIndex: 'start_point'
    },
    {
      title: 'Điểm kết thúc',
      dataIndex: 'end_point'
    },
    {
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48'>
            <EyeOutlined className='text-green-500 text-2xl cursor-pointer mr-4' />
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' onClick={() => handleShowModalDelete(data)} />
          </div>
        )
      }
    }
  ]
  const [listRoutesBus, setListRoutesBus] = useState([])
  const [listDrivers, setListDrivers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [dataDeleteModal, setdataDeleteModal] = useState({})

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleShowModalDelete = (data) => {
    setIsModalDeleteOpen(true)
    setdataDeleteModal(data)
  }

  const fetchListRoutesBus = async () => {
    try {
      const res = await userAPI.getAllBusRoutes()
      const drivers = await userAPI.getAllDrivers()
      setListRoutesBus(res)
      setListDrivers(drivers)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchListRoutesBus()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-4'>
          <Button type='primary' className='mb-4' onClick={showModal}>
            Create new route
          </Button>
          <Table columns={columns} dataSource={listRoutesBus} />
        </div>
      </div>
      <ModalBusRoute isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} listDrivers={listDrivers} fetchListRoutesBus={fetchListRoutesBus} />
      <ModalDeleteBusRoute isModalOpen={isModalDeleteOpen} setIsModalOpen={setIsModalDeleteOpen} data={dataDeleteModal} fetchListRoutesBus={fetchListRoutesBus} />
    </>
  )
}

export default Driver
