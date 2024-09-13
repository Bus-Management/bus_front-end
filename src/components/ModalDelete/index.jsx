import { Modal } from 'antd'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

function ModalDelete({ isModalOpen, setIsModalOpen, data, fetchListRoutesBus, fetchAllUsers }) {
  const handleOk = async () => {
    setIsModalOpen(false)
    try {
      if (fetchListRoutesBus) {
        await userAPI.deleteBusRoute(data.id)
        fetchListRoutesBus()
      } else if (fetchAllUsers) {
        await userAPI.deleteUser(data.id)
        fetchAllUsers()
      }
      toast.success('Xóa thành công')
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
          Bạn có chắc muốn xóa <span className='font-medium text-red-600'>{data.route_name}</span> không ?
        </p>
      </Modal>
    </>
  )
}

export default ModalDelete
