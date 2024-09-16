import { Button, Modal, Table } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import { AuthContext } from '~/context/AuthContext'

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
            <Button type='primary' onClick={() => handleShowListUsers(data)} className='mb-2 !bg-yellow-500 w-full'>
              Xem danh sách học sinh
            </Button>
            <Button type='primary' onClick={() => handleShowListStops(data)} className='w-full'>
              Xem danh sách điểm đón trả
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [actionTable, setActionTable] = useState('ListUsers')

  const handleShowListUsers = async (data) => {
    setActionTable('ListUsers')
    setIsModalOpen(true)
    const newListStudent = []
    await Promise.all(
      data.students.map(async (item) => {
        const student = await userAPI.getDetailUser(item.student_id)
        newListStudent.push(student)
      })
    )
    setListStudents(newListStudent)
  }

  const handleShowListStops = async (data) => {
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
      const res = await userAPI.getListRoutesBus(currentUser.id)
      setListRoutesBus(res.assignedRoutes)
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
      <Modal width={800} title={`Danh sách ${actionTable === 'ListUsers' ? 'học sinh' : 'điểm đón'}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Table columns={actionTable === 'ListUsers' ? columnStudents : columnStops} dataSource={actionTable === 'ListUsers' ? listStudents : listStops} pagination={false} />
      </Modal>
    </>
  )
}

export default Driver
