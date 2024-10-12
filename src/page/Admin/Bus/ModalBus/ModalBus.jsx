import { Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import _ from 'lodash'

import userAPI from '~/api/userAPI'
import busAPI from '~/api/busAPI'
import { data } from 'autoprefixer'

function ModalBus({ isOpen, setIsOpen }) {
  const dataBusDefault = {
    license_plate: '',
    capacity: '',
    routeId: '',
    driverId: ''
  }
  const [dataBus, setDataBus] = useState(dataBusDefault)
  const [listDrivers, setListDrivers] = useState([])

  const fetchListRoutesBus = async () => {
    try {
      const drivers = await userAPI.getAllDrivers()
      setListDrivers(drivers)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleChangeInput = (name, value) => {
    let _dataBusRoute = _.cloneDeep(dataBus)
    _dataBusRoute[name] = value
    setDataBus(_dataBusRoute)
  }

  const handleOk = async () => {
    setIsOpen(false)
    try {
      const res = await busAPI.createBus(dataBus)
      toast.success(res.message)
      setDataBus(dataBusDefault)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchListRoutesBus()
  }, [])

  return (
    <>
      <Modal
        title='Tạo mới xe bus'
        width='50%'
        open={isOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsOpen(false)
          setDataBus(dataBusDefault)
        }}
      >
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <span>Biển số xe</span>
            <Input value={data.license_plate} onChange={(e) => handleChangeInput('license_plate', e.target.value)} />
          </div>
          <div>
            <span>Số lượng học sinh</span>
            <Input value={data.capacity} onChange={(e) => handleChangeInput('capacity', e.target.value)} />
          </div>
          <div>
            <span>Tài xế</span>
            <Select
              placeholder='Vui lòng chọn tài xế'
              onChange={(value) => {
                handleChangeInput('driverId', value)
              }}
              value={dataBus.driverId || undefined}
              options={listDrivers.map((item) => {
                return {
                  value: item.id,
                  label: item.fullName
                }
              })}
              className='w-full'
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalBus
