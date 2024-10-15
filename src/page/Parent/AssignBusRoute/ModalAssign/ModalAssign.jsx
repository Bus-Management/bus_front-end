import { Modal } from 'antd'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'

function ModalAssign({ isModalOpen, setIsModalOpen, data, fetchListRoutesBus }) {
  const handleOk = async () => {
    try {
      const res = await busRouteAPI.assignRoute(data)
      toast.success(res.message)
      setIsModalOpen(false)
      fetchListRoutesBus()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal title='Xác đăng ký' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc muốn đăng ký tuyến đường này ?</p>
      </Modal>
    </>
  )
}

export default ModalAssign
