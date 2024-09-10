import { Modal } from 'antd'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

function ModalDeleteBusRoute({ isModalOpen, setIsModalOpen, data, fetchListRoutesBus }) {
  const handleOk = async () => {
    setIsModalOpen(false)
    try {
      await userAPI.deleteBusRoute(data.id)
      toast.success('Xóa thành công')
      fetchListRoutesBus()
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal title='Xác nhận xóa' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Bạn có chắc muốn xóa tuyến xe <span className='font-medium text-red-600'>{data.route_name}</span> không ?
        </p>
      </Modal>
    </>
  )
}

export default ModalDeleteBusRoute
