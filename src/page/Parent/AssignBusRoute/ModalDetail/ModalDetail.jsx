import { Input, Modal, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

function ModalDetail({ isModalOpen, setIsModalOpen, data }) {
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal title='Chi tiết điểm đón trả' open={isModalOpen} onCancel={handleCancel}>
        <div className='grid grid-cols-3 gap-4'>
          {data.stops?.length > 0 &&
            data.stops.map((value) => {
              return (
                <>
                  <div>
                    <span>Địa chỉ</span>
                    <Input value={value.address} />
                  </div>
                  <div>
                    <span>Thời gian đón</span>
                    <TimePicker className='w-full' value={dayjs(value.pickup_time, 'HH:mm:ss')} />
                  </div>
                  <div>
                    <span>Thời gian trả</span>
                    <TimePicker className='w-full' value={dayjs(value.dropOff_time, 'HH:mm:ss')} />
                  </div>
                </>
              )
            })}
        </div>
      </Modal>
    </>
  )
}

export default ModalDetail
