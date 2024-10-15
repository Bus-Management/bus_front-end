import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import ModalBusRoute from './ModalBusRoute/ModalBusRoute'
import ModalDetailBusRoute from './ModalDetailBusRoute/ModalDetailBusRoute'
import ModalDelete from '~/components/ModalDelete'
import busRouteAPI from '~/api/busRouteAPI'
import ModalMapBoxDraggable from '~/components/ModalMapBoxDraggable'
import busAPI from '~/api/busAPI'
import updateStatusRoutesBus from '~/utils/updateStatusRoutesBus'

function Driver() {
  const columns = [
    {
      title: 'ID tuyến đường',
      dataIndex: 'id'
    },
    {
      title: 'Tên tuyến đường',
      dataIndex: 'route_name'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_day'
    },
    {
      title: 'Ngày hoàn thành',
      dataIndex: 'end_day'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (data) => {
        switch (data) {
          case 'upcoming':
            return (
              <>
                <Tag color='yellow'>Sắp khởi hành</Tag>
              </>
            )
          case 'progressing':
            return (
              <>
                <Tag color='blue'>Đang khởi hành</Tag>
              </>
            )
          case 'completed':
            return (
              <>
                <Tag color='green'>Đã hoàn thành</Tag>
              </>
            )
          default:
            break
        }
      }
    },
    {
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48'>
            <EyeOutlined className='text-green-500 text-2xl cursor-pointer mr-4' onClick={() => handleShowModalDetail(data)} />
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' onClick={() => handleShowModalUpdate(data)} />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' onClick={() => handleShowModalDelete(data)} />
          </div>
        )
      }
    }
  ]
  const [listRoutesBus, setListRoutesBus] = useState([])
  const [listDrivers, setListDrivers] = useState([])
  const [listBus, setListBus] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [dataDeleteModal, setdataDeleteModal] = useState({})
  const [dataDetailModal, setDataDetailModal] = useState({})
  const [dataUpdateModal, setDataUpdateModal] = useState({})
  const [actionModal, setActionModal] = useState('CREATE')

  const showModal = () => {
    setActionModal('CREATE')
    setIsModalOpen(true)
  }

  const handleShowModalDelete = (data) => {
    setIsModalDeleteOpen(true)
    setdataDeleteModal(data)
  }

  const handleShowModalUpdate = (data) => {
    setActionModal('UPDATE')
    setIsModalOpen(true)
    setDataUpdateModal(data)
  }

  const handleShowModalDetail = (data) => {
    setIsModalDetailOpen(true)
    setDataDetailModal(data)
  }

  const fetchListRoutesBus = async () => {
    try {
      const res = await busRouteAPI.getAllBusRoutes()
      const drivers = await userAPI.getAllDrivers()
      const bus = await busAPI.getAllBus()
      setListDrivers(drivers)
      setListBus(bus)
      const newList = res.map((item) => {
        return {
          ...item,
          studentIds: JSON.parse(item.studentIds)
        }
      })

      updateStatusRoutesBus(newList, setListRoutesBus)
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
            Tạo tuyến đường
          </Button>
          <Table columns={columns} dataSource={listRoutesBus} />
        </div>
      </div>
      <ModalBusRoute
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        listDrivers={listDrivers}
        listBus={listBus}
        fetchListRoutesBus={fetchListRoutesBus}
        action={actionModal}
        data={dataUpdateModal}
      />
      <ModalDelete isModalOpen={isModalDeleteOpen} setIsModalOpen={setIsModalDeleteOpen} data={dataDeleteModal} fetchListRoutesBus={fetchListRoutesBus} />
      <ModalDetailBusRoute isModalOpen={isModalDetailOpen} setIsModalOpen={setIsModalDetailOpen} data={dataDetailModal} listDrivers={listDrivers} />
      <ModalMapBoxDraggable />
    </>
  )
}

export default Driver
