import { DatePicker, Input, Modal, Select, Table, TimePicker } from 'antd'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import _ from 'lodash'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'

import busAPI from '~/api/busAPI'

function ModalBusRoute({ isModalOpen, setIsModalOpen, fetchListRoutesBus, listDrivers, action, data }) {
  const dataBusRouteDefault = {
    route_name: '',
    bus_capacity: '',
    driver_id: '',
    start_point: '',
    end_point: '',
    start_day: '',
    stops: [],
    students: []
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
      const res = action === 'CREATE' ? await busAPI.createBusRoute({ ...dataBusRoute, stops: listStops }) : await busAPI.updateBusRoute(dataBusRoute.id, dataBusRoute)
      if (res) {
        toast.success(res.message)
        fetchListRoutesBus()
        setDataBusRoute(dataBusRouteDefault)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setDataBusRoute(dataBusRouteDefault)
  }

  const handleAddStops = () => {
    let _listStops = _.cloneDeep(listStops)
    _listStops[`stop${uuidv4()}`] = dataStopsDefault
    setListStops(_listStops)
    if (action === 'UPDATE') {
      _listStops = _.cloneDeep(dataBusRoute.stops)
      const newStops = [..._listStops, { address: '', pickup_time: '', dropOff_time: '' }]
      setDataBusRoute({ ...dataBusRoute, stops: newStops })
    }
  }

  const handleDeleteStops = (key) => {
    let _listStops = _.cloneDeep(listStops)
    delete _listStops[key]
    setListStops(_listStops)
    if (action === 'UPDATE') {
      _listStops = _.cloneDeep(dataBusRoute.stops)
      _listStops.splice(key, 1)
      setDataBusRoute({ ...dataBusRoute, stops: _listStops })
    }
  }

  const handleChangeInput = (name, value) => {
    let _dataBusRoute = _.cloneDeep(dataBusRoute)
    _dataBusRoute[name] = value
    setDataBusRoute(_dataBusRoute)
  }

  const handleChangeInputStops = (name, key, value) => {
    let _listStops = _.cloneDeep(action === 'UPDATE' ? dataBusRoute.stops : listStops)
    _listStops[key][name] = value
    if (action === 'UPDATE') {
      setDataBusRoute({ ...dataBusRoute, stops: _listStops })
    } else {
      setListStops(_listStops)
    }
  }

  useEffect(() => {
    setDataBusRoute(data)
  }, [data])

  return (
    <Modal title={action === 'CREATE' ? 'Tuyến xe mới' : 'Cập nhật tuyến xe'} width='50%' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <span>Tên tuyến xe</span>
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
            value={dataBusRoute.start_day && dayjs(dataBusRoute.start_day, dateFormat)}
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
            value={dataBusRoute.driver_id || undefined}
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
        <div className='grid grid-cols-3'>
          {Object.entries(dataBusRoute.stops?.length > 0 ? dataBusRoute.stops : listStops).map(([key, value], index) => {
            return (
              <>
                <div className={`flex gap-4 w-full col-span-2 ${key}`}>
                  <div>
                    <span>Địa chỉ</span>
                    <Input value={value.address} onChange={(e) => handleChangeInputStops('address', key, e.target.value)} />
                  </div>
                  <div>
                    <span>Thời gian đón</span>
                    <TimePicker
                      className='w-full'
                      value={value.pickup_time && dayjs(value.pickup_time, 'HH:mm:ss')}
                      onChange={(time, timeString) => handleChangeInputStops('pickup_time', key, timeString)}
                    />
                  </div>
                  <div>
                    <span>Thời gian trả</span>
                    <TimePicker
                      className='w-full'
                      value={value.dropOff_time && dayjs(value.dropOff_time, 'HH:mm:ss')}
                      onChange={(time, timeString) => handleChangeInputStops('dropOff_time', key, timeString)}
                    />
                  </div>
                </div>
                <div className='pt-6 ml-4'>
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
