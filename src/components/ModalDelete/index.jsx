import { Modal } from 'antd'
import { toast } from 'react-toastify'
import busAPI from '~/api/busAPI'
import busRouteAPI from '~/api/busRouteAPI'
import userAPI from '~/api/userAPI'

function ModalDelete({ isModalOpen, setIsModalOpen, data, fetchListRoutesBus, fetchAllUsers, fetchListChildrens, fetchListBus }) {
  const handleOk = async () => {
    setIsModalOpen(false)
    try {
      if (fetchListRoutesBus) {
        await busRouteAPI.deleteBusRoute(data.id)
        fetchListRoutesBus()
      } else if (fetchAllUsers) {
        await userAPI.deleteUser(data.id)
        fetchAllUsers()
      } else if (fetchListChildrens) {
        await userAPI.deleteUser(data.id)
        fetchListChildrens()
      } else if (fetchListBus) {
        await busAPI.deleteBus(data.id)
        fetchListBus()
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
          Bạn có chắc muốn xóa <span className='font-medium text-red-600'>{data.license_plate || data.route_name || data.fullName}</span> không ?
        </p>
      </Modal>
    </>
  )
}

export default ModalDelete
