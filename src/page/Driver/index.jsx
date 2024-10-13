import { Button, Modal, Table, Tag } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'
import userAPI from '~/api/userAPI'
import MapBox from '~/components/MapBox '
import { AuthContext } from '~/context/AuthContext'
import updateStatusRoutesBus from '~/utils/updateStatusRoutesBus'

function Driver() {
  const { currentUser } = useContext(AuthContext)

  const columns = [
    {
      title: 'ID Tuyến xe',
      dataIndex: 'id'
    },
    {
      title: 'Tên tuyến xe',
      dataIndex: 'route_name'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_day'
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
            <Button type='primary' onClick={() => handleShowListUsers(data)} className='mb-2 !bg-yellow-500 w-full'>
              Xem danh sách học sinh
            </Button>
            <Button type='primary' onClick={() => handleShowListStops(data)} className='w-full'>
              Xem địa chỉ
            </Button>
          </div>
        )
      }
    }
  ]

  const columnStudents = [
    {
      title: 'ID Học sinh',
      dataIndex: 'id'
    },
    {
      title: 'Tên học sinh',
      dataIndex: 'fullName'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age'
    },
    {
      title: 'Lớp',
      dataIndex: 'class'
    }
  ]

  const columnStops = [
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Thời gian đón',
      dataIndex: 'pickup_time'
    },
    {
      title: 'Thời gian trả',
      dataIndex: 'dropOff_time'
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])
  const [listStudents, setListStudents] = useState([])
  const [listStops, setListStops] = useState([])
  const [dataDetailModal, setDataDetailModal] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [actionTable, setActionTable] = useState('ListUsers')

  const handleShowListUsers = async (data) => {
    setActionTable('ListUsers')
    setIsModalOpen(true)
    const newListStudent = []
    await Promise.all(
      data.studentIds.map(async (item) => {
        const student = await userAPI.getDetailUser(item)
        newListStudent.push(student)
      })
    )
    setListStudents(newListStudent)
  }

  const handleShowListStops = async (data) => {
    setDataDetailModal({ ...data, start_point: JSON.parse(data.start_point), end_point: JSON.parse(data.end_point) })
    setActionTable('ListStops')
    setIsModalOpen(true)
    const newListStops = []
    await Promise.all(
      data.stops.map(async (item) => {
        newListStops.push(item)
      })
    )
    setListStops(newListStops)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const fetchListRoutesBus = async () => {
    try {
      const res = await busRouteAPI.getListRoutesBus(currentUser.id)
      const newList = res.assignedRoutes.map((item) => {
        return {
          ...item,
          stops: JSON.parse(item.stops),
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
          <Table columns={columns} dataSource={listRoutesBus} />
        </div>
      </div>
      <Modal width='50%' title={`Danh sách ${actionTable === 'ListUsers' ? 'học sinh' : 'điểm đón'}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Table columns={actionTable === 'ListUsers' ? columnStudents : columnStops} dataSource={actionTable === 'ListUsers' ? listStudents : listStops} pagination={false} />
        {actionTable === 'ListStops' && <MapBox pointA={dataDetailModal.start_point} pointB={dataDetailModal.end_point} />}
      </Modal>
    </>
  )
}

export default Driver
