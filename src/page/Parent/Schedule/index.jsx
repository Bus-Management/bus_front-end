import { Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'

function Schedule() {
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
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])

  const fetchListRoutesBus = async () => {
    try {
      const res = await busRouteAPI.getRoutesAssignedStudent()
      const currentDate = new Date()

      const updatedRoutes = res.map((route) => {
        const startDate = new Date(route.start_day)
        let status = route.status

        if (startDate > currentDate) {
          status = 'upcoming'
        } else if (startDate.toDateString() === currentDate.toDateString()) {
          status = 'progressing'
        } else if (startDate < currentDate) {
          status = 'completed'
        }

        if (status !== route.status) {
          busRouteAPI.updateStatusBusRoute({ routeId: route.id, status })
        }

        return { ...route, status }
      })

      setListRoutesBus(updatedRoutes)
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
    </>
  )
}

export default Schedule
