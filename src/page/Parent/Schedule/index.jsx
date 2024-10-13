import { Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'
import updateStatusRoutesBus from '~/utils/updateStatusRoutesBus'

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
      updateStatusRoutesBus(res, setListRoutesBus)
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
