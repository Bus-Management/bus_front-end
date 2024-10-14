import { Button, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'
import ModalDetailBusRoute from '~/page/Admin/BusRoute/ModalDetailBusRoute/ModalDetailBusRoute'

function HistorySchedule() {
  const columns = [
    {
      title: 'Tài xế',
      dataIndex: 'avatart',
      render: (data) => <img src={data || '/no-user.png'} className='h-10 w-12 rounded-full' />
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
      title: 'Ngày kết thúc',
      dataIndex: 'end_day',
      render: (data) => <span>{data}</span>
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
          <>
            <Button type='primary' onClick={() => handleShowModalDetail(data)} className='!bg-cyan-500 w-full'>
              Xem chi tiết
            </Button>
          </>
        )
      }
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])
  const [dataDetailModal, setDataDetailModal] = useState({})
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)

  const handleShowModalDetail = (data) => {
    setIsModalDetailOpen(true)
    setDataDetailModal({ ...data, stops: JSON.parse(data.stops), start_point: JSON.parse(data.start_point), end_point: JSON.parse(data.end_point) })
  }

  const fetchListRoutesBus = async () => {
    try {
      const res = await busRouteAPI.getRoutesAssignedStudentCompleted()
      setListRoutesBus(res)
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
      <ModalDetailBusRoute isModalOpen={isModalDetailOpen} setIsModalOpen={setIsModalDetailOpen} data={dataDetailModal} />
    </>
  )
}

export default HistorySchedule
