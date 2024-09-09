import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Modal, Select, Table, TimePicker } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' />
          </div>
        )
      }
    }
  ]

  const [listRoutesBus, setListRoutesBus] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState(null)

  const dataStopsDefault = { address: '', pickup_time: '', dropOff_time: '' }
  const [listStops, setListStops] = useState({ stop0: dataStopsDefault })

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onChange = (time) => {
    setValue(time)
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

  const fetchListRoutesBus = async () => {
    try {
      const res = await userAPI.getAllBusRoutes()
      setListRoutesBus(res)
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
            <Input />
          </div>
          <div>
            <span>Điểm bắt đầu</span>
            <Input />
          </div>
          <div>
            <span>Điểm kết thúc</span>
            <Input />
          </div>
          <div>
            <span>Ngày bắt đầu</span>
            <DatePicker className='w-full' onChange={onChange} />
          </div>
          <div>
            <span>Tài xế</span>
            <Select
              placeholder='Vui lòng chọn tài xế'
              // onChange={(value) => {
              //   handleChangeInput('supplierId', value)
              // }}
              options={[
                {
                  value: 'jack',
                  label: 'Jack'
                },
                {
                  value: 'lucy',
                  label: 'Lucy'
                }
              ]}
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
                    <Input value={value.address} />
                  </div>
                  <div>
                    <span>Thời gian đón</span>
                    <TimePicker className='w-full' value={value.pickup_time} onChange={onChange} />
                  </div>
                  <div>
                    <span>Thời gian trả</span>
                    <TimePicker className='w-full' value={value.dropOff_time} onChange={onChange} />
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
