import { Modal } from 'antd'
import { toast } from 'react-toastify'
import busAPI from '~/api/busAPI'
import userAPI from '~/api/userAPI'

function ModalDelete({ isModalOpen, setIsModalOpen, data, fetchListRoutesBus, fetchAllUsers, fetchListChildrens }) {
  const handleOk = async () => {
    setIsModalOpen(false)
    try {
      if (fetchListRoutesBus) {
        await busAPI.deleteBusRoute(data.id)
        fetchListRoutesBus()
      } else if (fetchAllUsers) {
        await userAPI.deleteUser(data.id)
        fetchAllUsers()
      } else if (fetchListChildrens) {
        await userAPI.deleteUser(data.id)
        fetchListChildrens()
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
          Bạn có chắc muốn xóa <span className='font-medium text-red-600'>{data.route_name || data.fullName}</span> không ?
        </p>
      </Modal>
    </>
  )
}

export default ModalDelete
