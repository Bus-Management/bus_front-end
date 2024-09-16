import { EyeOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import ModalDetail from './ModalDetail/ModalDetail'
import ModalAssign from './ModalAssign/ModalAssign'
import { useParams } from 'react-router-dom'

function AssignBusRoute() {
  const { childrenId } = useParams()

  const columns = [
    {
      title: 'Tên tuyến đường',
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
          <div className='w-48 flex items-center '>
            <EyeOutlined className='text-green-500 text-2xl cursor-pointer mr-4' onClick={() => handleDetail(data)} />
            {data.students.some((item) => item.student_id === childrenId) ? (
              <>
                <Button type='primary' disabled onClick={() => handleAssignRoute(data)}>
                  Đăng ký
                </Button>
                <Button type='primary' className='!bg-red-600 ml-2' onClick={() => handleUnassignRoute(data)}>
                  Hủy đăng ký
                </Button>
              </>
            ) : (
              <Button type='primary' onClick={() => handleAssignRoute(data)}>
                Đăng ký
              </Button>
            )}
          </div>
        )
      }
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalAssignOpen, setIsModalAssignOpen] = useState(false)
  const [isModalUnassignOpen, setIsModalUnassignOpen] = useState(false)
  const [listRoutesBus, setListRoutesBus] = useState([])
  const [dataDetail, setDataDetail] = useState({})

  const handleDetail = (data) => {
    setIsModalOpen(true)
    setDataDetail(data)
  }
  const handleAssignRoute = (data) => {
    setIsModalAssignOpen(true)
    setDataDetail({ routeId: data.id, studentId: childrenId })
  }
  const handleUnassignRoute = (data) => {
    setIsModalUnassignOpen(true)
    setDataDetail({ routeId: data.id, studentId: childrenId })
  }

  const handleOk = async () => {
    try {
      const res = await userAPI.unAssignRoute(dataDetail)
      toast.success(res.message)
      setIsModalUnassignOpen(false)
      fetchListRoutesBus()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

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
      <ModalDetail isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataDetail} />
      <ModalAssign isModalOpen={isModalAssignOpen} data={dataDetail} setIsModalOpen={setIsModalAssignOpen} fetchListRoutesBus={fetchListRoutesBus} />
      <Modal title='Xác hủy đăng ký' open={isModalUnassignOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc muốn xóa hủy đăng ký?</p>
      </Modal>
    </>
  )
}

export default AssignBusRoute
