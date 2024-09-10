import { DatePicker, Input, Modal, Select, TimePicker } from 'antd'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import _ from 'lodash'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'

import userAPI from '~/api/userAPI'

function ModalBusRoute({ isModalOpen, setIsModalOpen, fetchListRoutesBus, listDrivers }) {
  const dataBusRouteDefault = {
    route_name: '',
    bus_capacity: '',
    driver_id: '',
    start_point: '',
    end_point: '',
    start_day: '',
    stops: []
  }
  const [dataBusRoute, setDataBusRoute] = useState(dataBusRouteDefault)

  const dataStopsDefault = { address: '', pickup_time: '', dropOff_time: '' }
  const [listStops, setListStops] = useState({ stop0: dataStopsDefault })

  const buildDataListStops = () => {
    let results = []
    Object.entries(listStops).map(([key, value], index) => {
      let obj = {
        stop_id: uuidv4(),
        ...value
      }
      results.push(obj)
    })
    return results
  }

  const handleOk = async () => {
    setIsModalOpen(false)
    const listStops = buildDataListStops()
    try {
      await userAPI.createBusRoute({ ...dataBusRoute, stops: listStops })
      toast.success('Tạo tuyến đường thành công')
      fetchListRoutesBus()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleAddStops = () => {
    let _listStops = _.cloneDeep(listStops)
    _listStops[`stop${uuidv4()}`] = dataStopsDefault
    setListStops(_listStops)
  }
  const handleDeleteStops = (key) => {
    let _listStops = _.cloneDeep(listStops)
    delete _listStops[key]
    setListStops(_listStops)
  }

  const handleChangeInput = (name, value) => {
    let _dataBusRoute = _.cloneDeep(dataBusRoute)
    _dataBusRoute[name] = value
    setDataBusRoute(_dataBusRoute)
  }

  const handleChangeInputStops = (name, key, value) => {
    let _listStops = _.cloneDeep(listStops)
    _listStops[key][name] = value
    setListStops(_listStops)
  }

  return (
    <Modal title='Tuyến đường mới' width='50%' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <span>Tên tuyến đường</span>
          <Input value={dataBusRoute.route_name} onChange={(e) => handleChangeInput('route_name', e.target.value)} />
        </div>
        <div>
          <span>Điểm bắt đầu</span>
          <Input value={dataBusRoute.start_point} onChange={(e) => handleChangeInput('start_point', e.target.value)} />
        </div>
        <div>
          <span>Điểm kết thúc</span>
          <Input value={dataBusRoute.end_point} onChange={(e) => handleChangeInput('end_point', e.target.value)} />
        </div>
        <div>
          <span>Ngày bắt đầu</span>
          <DatePicker
            className='w-full'
            defaultValue={dataBusRoute.start_day && dayjs(dataBusRoute.start_day, dateFormat)}
            onChange={(date, dateString) => handleChangeInput('start_day', dateString)}
          />
        </div>
        <div>
          <span>Tài xế</span>
          <Select
            placeholder='Vui lòng chọn tài xế'
            onChange={(value) => {
              handleChangeInput('driver_id', value)
            }}
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
      <div className='mt-4'>
        <p className=' text-lg font-medium'>Thêm các điểm dừng</p>
        <div className='w-4/5 grid grid-cols-4 gap-4'>
          {Object.entries(listStops).map(([key, value], index) => {
            return (
              <>
                <div>
                  <span>Địa chỉ</span>
                  <Input value={value.address} onChange={(e) => handleChangeInputStops('address', key, e.target.value)} />
                </div>
                <div>
                  <span>Thời gian đón</span>
                  <TimePicker
                    className='w-full'
                    defaultValue={value.pickup_time && dayjs(value.pickup_time, 'HH:mm:ss')}
                    onChange={(time, timeString) => handleChangeInputStops('pickup_time', key, timeString)}
                  />
                </div>
                <div>
                  <span>Thời gian trả</span>
                  <TimePicker
                    className='w-full'
                    defaultValue={value.dropOff_time && dayjs(value.dropOff_time, 'HH:mm:ss')}
                    onChange={(time, timeString) => handleChangeInputStops('dropOff_time', key, timeString)}
                  />
                </div>
                <div className='pt-6'>
                  <PlusCircleOutlined onClick={handleAddStops} className='text-2xl cursor-pointer text-green-700 mr-2' />
                  {index > 0 && <DeleteOutlined onClick={() => handleDeleteStops(key)} className='text-2xl cursor-pointer text-red-500' />}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default ModalBusRoute
