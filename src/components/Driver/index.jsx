import { Button, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
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
      title: 'Điểm bắt đầu',
      dataIndex: 'start_point'
    },
    {
      title: 'Điểm kết thúc',
      dataIndex: 'end_point'
    },
    {
      title: 'Chi tiết',
      render: (data) => {
        return (
          <>
            <Button type='primary' onClick={() => showModal(data)}>
              Xem danh sách học sinh
            </Button>
          </>
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
      dataIndex: 'route_name'
    },
    {
      title: 'Tuổi',
      dataIndex: 'route_name'
    },
    {
      title: 'Lớp',
      dataIndex: 'route_name'
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])
  const [listStudents, setListStudents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = (data) => {
    setIsModalOpen(true)
    console.log(data)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const fetchListRoutesBus = async () => {
    try {
      const res = await userAPI.getListRoutesBus('755e5eb5-c5c9-4dc3-9afd-86d0c27449e6')
      setListRoutesBus(res.assignedRoutes)
    } catch (error) {
      console.log(error)
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
      <Modal width={800} title='Danh sách học sinh' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Table columns={columnStudents} dataSource={listRoutesBus} />
      </Modal>
    </>
  )
}

export default Driver
