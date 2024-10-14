import { Button, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAssign from './ModalAssign/ModalAssign'
import { useParams } from 'react-router-dom'
import busRouteAPI from '~/api/busRouteAPI'
import ModalDetailBusRoute from '~/page/Admin/BusRoute/ModalDetailBusRoute/ModalDetailBusRoute'

function AssignBusRoute() {
  const { childrenId } = useParams()

  const columns = [
    {
      title: 'Tài xế',
      dataIndex: 'avatar',
      render: (data) => <img src={data || '/no-user.png'} className='size-11 rounded-full' />
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
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48 flex items-center '>
            <Button type='primary' className='!bg-cyan-600 mr-2' onClick={() => handleDetail(data)}>
              Xem chi tiết
            </Button>
            {JSON.parse(data.studentIds).some((item) => item === childrenId) ? (
              <>
                <Button type='primary' disabled onClick={() => handleAssignRoute(data)}>
                  Đăng ký
                </Button>
                {data.status === 'progressing' ? (
                  <Button type='primary' disabled className='!bg-red-600 ml-2' onClick={() => handleUnassignRoute(data)}>
                    Hủy đăng ký
                  </Button>
                ) : (
                  <Button type='primary' className='!bg-red-600 ml-2' onClick={() => handleUnassignRoute(data)}>
                    Hủy đăng ký
                  </Button>
                )}
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
      const res = await busRouteAPI.unAssignRoute(dataDetail)
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
      const res = await busRouteAPI.getAllRoutesNoCompleted()
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
      <ModalAssign isModalOpen={isModalAssignOpen} data={dataDetail} setIsModalOpen={setIsModalAssignOpen} fetchListRoutesBus={fetchListRoutesBus} />
      <Modal title='Xác hủy đăng ký' open={isModalUnassignOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc muốn xóa hủy đăng ký?</p>
      </Modal>
      <ModalDetailBusRoute isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataDetail} />
    </>
  )
}

export default AssignBusRoute
