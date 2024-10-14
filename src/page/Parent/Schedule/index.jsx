import { Button, Modal, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'
import userAPI from '~/api/userAPI'
import MapBox from '~/components/MapBox '
import updateStatusRoutesBus from '~/utils/updateStatusRoutesBus'

function Schedule() {
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
    }
  ]

  const columns = [
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
      title: 'Action',
      key: 'action',
      render: (data) => (
        <>
          <Button type='primary' onClick={() => handleView(data)}>
            Theo dõi
          </Button>
        </>
      )
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])
  const [listStudents, setListStudents] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleView = async (data) => {
    setIsModalOpen(true)
    setDataDetail({ ...data, start_point: JSON.parse(data.start_point), end_point: JSON.parse(data.end_point) })
  }

  const fetchListRoutesBus = async () => {
    try {
      const res = await busRouteAPI.getRoutesAssignedStudent()
      const childrens = await userAPI.getAllChildrens()
      updateStatusRoutesBus(res, setListRoutesBus)
      setListStudents(childrens)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchListRoutesBus()
  }, [])

  return (
    <>
      <div className='container py-4'>
        <Table columns={columns} dataSource={listRoutesBus} />
      </div>
      <Modal width='50%' title='Theo dõi lịch trình' open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <Table columns={columnStudents} dataSource={listStudents} />
        <MapBox pointA={dataDetail.start_point} pointB={dataDetail.end_point} />
      </Modal>
    </>
  )
}

export default Schedule
