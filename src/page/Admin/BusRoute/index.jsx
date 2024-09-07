import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

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
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' />
          </div>
        )
      }
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])

  const fetchListRoutesBus = async () => {
    try {
      const res = await userAPI.getAllBusRoutes()
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
    </>
  )
}

export default Driver
