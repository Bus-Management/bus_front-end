import { DatePicker, Input, Modal, Table, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react'
import userAPI from '~/api/userAPI'
import MapBox from '~/components/MapBox '
import fetchListStudents from '~/utils/fetchListStudents'
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'

function ModalDetailBusRoute({ isModalOpen, setIsModalOpen, data }) {
  const columns = [
    {
      title: 'ID Học sinh',
      dataIndex: 'id'
    },
    {
      title: 'Tên Học sinh',
      dataIndex: 'fullName'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age'
    },
    {
      title: 'Lớp',
      dataIndex: 'class'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    }
  ]

  const [dataDriver, setDataDriver] = useState({})
  const [listStudent, setListStudent] = useState([])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const fetchDataDriver = async () => {
    try {
      const res = await userAPI.getDetailUser(data.driver_id)
      setDataDriver(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getListStudents = async () => {
    const res = await fetchListStudents({ ...data, students: JSON.parse(data.students) })
    setListStudent(res)
  }

  useEffect(() => {
    fetchDataDriver()
    getListStudents()
  }, [data])

  return (
    <Modal title='Chi tiết thông tin tuyến xe' width='60%' open={isModalOpen} onCancel={handleCancel}>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <span>Tên tuyến xe</span>
          <Input value={data.route_name} />
        </div>
        <div>
          <span>Ngày bắt đầu</span>
          <DatePicker className='w-full' value={data.start_day && dayjs(data.start_day, dateFormat)} />
        </div>
        <div>
          <span>Tài xế</span>
          <Input value={dataDriver.fullName} />
        </div>
      </div>
      <div className='mt-4'>
        <p className=' text-lg font-medium'>Danh sách các điểm dừng</p>
        <div className='w-4/5 grid grid-cols-3 gap-4'>
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
      </div>
      <div className='mt-4'>
        <p className=' text-lg font-medium'>Danh sách học sinh</p>
        <div className=''>
          <Table columns={columns} dataSource={listStudent} />
        </div>
      </div>
      <div className='mt-6 '>
        <MapBox pointA={data.start_point} pointB={data.end_point} />
      </div>
    </Modal>
  )
}

export default ModalDetailBusRoute
