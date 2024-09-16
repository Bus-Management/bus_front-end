import { Modal } from 'antd'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

function ModalAssign({ isModalOpen, setIsModalOpen, data, fetchListRoutesBus }) {
  const handleOk = async () => {
    try {
      const res = await userAPI.assignRoute(data)
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
        <p>Bạn có chắc muốn đăng ký tuyến xe này ?</p>
      </Modal>
    </>
  )
}

export default ModalAssign
