import { Input, Modal, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import MapBox from '~/components/MapBox '
dayjs.extend(customParseFormat)

function ModalDetail({ isModalOpen, setIsModalOpen, data }) {
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal title='Chi tiết điểm đón trả' open={isModalOpen} width='50%' onCancel={handleCancel}>
        <div className='grid grid-cols-3 gap-4 mb-4'>
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
        <div>
          <span className='font-medium text-lg'>Tuyến đường chạy</span>
          <MapBox pointA={data.start_point} pointB={data.end_point} />
        </div>
      </Modal>
    </>
  )
}

export default ModalDetail
