import { DatePicker, Input, Modal, Table, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import busRouteAPI from '~/api/busRouteAPI'
import MapBox from '~/components/MapBox '
import { AuthContext } from '~/context/AuthContext'
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
  const { currentUser } = useContext(AuthContext)

  const [dataDetail, setDataDetail] = useState({})
  const [listStudent, setListStudent] = useState([])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const fetchDataDetail = async () => {
    try {
      if (data.id != undefined) {
        const res = await busRouteAPI.getDetailBusRoute(data.id)
        setDataDetail(res)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const getListStudents = async () => {
    const res = await fetchListStudents({ ...data, studentIds: JSON.parse(data.studentIds) })
    setListStudent(res)
  }

  useEffect(() => {
    getListStudents()
    fetchDataDetail()
  }, [data])

  return (
    <Modal title='Chi tiết thông tin tuyến xe' width='60%' open={isModalOpen} onCancel={handleCancel}>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <span>Tên tuyến xe</span>
          <Input value={dataDetail.route_name} />
        </div>
        <div>
          <span>Ngày bắt đầu</span>
          <DatePicker className='w-full' value={dataDetail.start_day && dayjs(dataDetail.start_day, dateFormat)} />
        </div>
        <div>
          <span>Tài xế</span>
          <Input value={dataDetail.driverName} />
        </div>
        <div>
          <span>Xe bus</span>
          <Input value={dataDetail.license_plate} />
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
      {currentUser.role === 'Admin' && (
        <div className='mt-4'>
          <p className=' text-lg font-medium'>Danh sách học sinh</p>
          <div className=''>
            <Table columns={columns} dataSource={listStudent} />
          </div>
        </div>
      )}
      <div className='mt-6 '>
        <MapBox pointA={data.start_point} pointB={data.end_point} />
      </div>
    </Modal>
  )
}

export default ModalDetailBusRoute
