import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Modal, Select, Table, TimePicker } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'

import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

function Driver() {
  const columns = [
    {
      title: 'ID Tuyến đường',
      dataIndex: 'id'
    },
    {
      title: 'Tên tuyến đường',
      dataIndex: 'route_name'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDay'
    },
    {
      title: 'Điểm bắt đầu',
      dataIndex: 'start_point'
    },
    {
      title: 'Điểm kết thúc',
      dataIndex: 'end_point'
    },
    {
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48'>
            <EyeOutlined className='text-green-500 text-2xl cursor-pointer mr-4' />
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' />
          </div>
        )
      }
    }
  ]
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
  const [listRoutesBus, setListRoutesBus] = useState([])
  const [listDrivers, setListDrivers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dataStopsDefault = { address: '', pickup_time: '', dropOff_time: '' }
  const [listStops, setListStops] = useState({ stop0: dataStopsDefault })

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = async () => {
    setIsModalOpen(false)
    const listStops = buildDataListStops()
    let _dataBusRoute = _.cloneDeep(dataBusRoute)
    _dataBusRoute['stops'] = listStops
    setDataBusRoute(_dataBusRoute)
    try {
      await userAPI.createBusRoute(dataBusRoute)
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

  const fetchListRoutesBus = async () => {
    try {
      const res = await userAPI.getAllBusRoutes()
      const drivers = await userAPI.getAllDrivers()
      setListRoutesBus(res)
      setListDrivers(drivers)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchListRoutesBus()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-4'>
          <Button type='primary' className='mb-4' onClick={showModal}>
            Create new route
          </Button>
          <Table columns={columns} dataSource={listRoutesBus} />
        </div>
      </div>
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
    </>
  )
}

export default Driver
