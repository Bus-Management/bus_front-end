import { Button, Dropdown, Modal, Table, Tag } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'
import userAPI from '~/api/userAPI'
import MapBox from '~/components/MapBox '
import { AuthContext } from '~/context/AuthContext'
import fetchListStudents from '~/utils/fetchListStudents'
import updateStatusRoutesBus from '~/utils/updateStatusRoutesBus'

function Driver() {
  const { currentUser } = useContext(AuthContext)
  const items = [
    {
      key: '1',
      label: (
        <>
          <span className='text-yellow-500' onClick={() => updateStatusStudent(idStudent, 'boarded')}>
            Đã lên xe
          </span>
        </>
      )
    },
    {
      key: '2',
      label: (
        <>
          <span className='text-green-500' onClick={() => updateStatusStudent(idStudent, 'arrived')}>
            Đã đến nơi
          </span>
        </>
      )
    },
    {
      key: '3',
      label: (
        <>
          <span className='text-blue-500' onClick={() => updateStatusStudent(idStudent, 'returning')}>
            Đang trở về
          </span>
        </>
      )
    },
    {
      key: '4',
      label: (
        <>
          <span className='text-red-500' onClick={() => updateStatusStudent(idStudent, 'absent')}>
            Vắng mặt
          </span>
        </>
      )
    }
  ]

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
            <Button type='primary' onClick={() => handleShowListUsers(data)} className='!bg-yellow-500 w-full'>
              Xem danh sách học sinh
            </Button>
            <Button type='primary' onClick={() => handleShowListStops(data)} className='w-full my-2'>
              Xem địa chỉ
            </Button>
            {data.status === 'progressing' && (
              <Button type='primary' onClick={() => handleCompleteRoute(data)} className='!bg-cyan-500 w-full'>
                Hoàn thành
              </Button>
            )}
          </div>
        )
      }
    }
  ]

  const columnStudents = [
    {
      title: 'Hình ảnh',
      dataIndex: 'avatar',
      render: (data) => (
        <>
          <img src={data || '/no-user.png'} className='size-11 rounded-full' />
        </>
      )
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
    },
    {
      title: 'Tên phụ huynh',
      dataIndex: 'parentName'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => {
        switch (value) {
          case 'boarded':
            return (
              <>
                <Tag color='warning' className='text-sm'>
                  Đã lên xe
                </Tag>
              </>
            )
          case 'arrived':
            return (
              <>
                <Tag color='success' className='text-sm'>
                  Đã đến nơi
                </Tag>
              </>
            )
          case 'returning':
            return (
              <>
                <Tag color='processing' className='text-sm'>
                  Đang trở về
                </Tag>
              </>
            )
          case 'absent':
            return (
              <>
                <Tag color='error' className='text-sm'>
                  Vắng mặt
                </Tag>
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
        const route = listRoutesBus.find((item) => item.id === data?.routeId)
        return (
          <>
            {route.status === 'progressing' && (
              <Dropdown
                menu={{
                  items
                }}
                placement='bottomRight'
                trigger={['click']}
              >
                <Button onClick={() => setIdStudent(data.id)}>Cập nhật trạng thái</Button>
              </Dropdown>
            )}
          </>
        )
      }
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
  const [idStudent, setIdStudent] = useState('')

  const updateStatusStudent = async (studentId, status) => {
    try {
      await userAPI.updateStatusUser({ studentId, status })
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowListUsers = async (data) => {
    setActionTable('ListUsers')
    setIsModalOpen(true)
    const listStudent = await fetchListStudents(data)
    const newListStudent = await Promise.all(
      listStudent.map(async (item) => {
        const parent = await userAPI.getDetailUser(item.parentId)
        return {
          ...item,
          parentName: parent.fullName,
          phone: parent.phone
        }
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

  const handleCompleteRoute = async (data) => {
    try {
      const res = await busRouteAPI.updateCompletedRoute({ routeId: data.id })
      toast.success(res.message)
      fetchListRoutesBus
    } catch (error) {
      toast.error(error.response.data.message)
    }
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
      const newList = res.map((item) => {
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
