import { Modal } from 'antd'
import Map from '~/components/Map'

function ModalMapBoxDraggable({ isOpenMapBoxDraggable, setIsOpenMapBoxDraggable, actionCordinate, dataBusRoute, setDataBusRoute }) {
  const handleCancel = () => {
    setIsOpenMapBoxDraggable(false)
  }

  const handleOK = () => {
    setIsOpenMapBoxDraggable(false)
  }

  return (
    <>
      <Modal title='Chọn địa điểm' open={isOpenMapBoxDraggable} width='50vw' height='50vh' onOk={handleOK} onCancel={handleCancel}>
        <Map actionCordinate={actionCordinate} dataBusRoute={dataBusRoute} setDataBusRoute={setDataBusRoute} />
      </Modal>
    </>
  )
}

export default ModalMapBoxDraggable
