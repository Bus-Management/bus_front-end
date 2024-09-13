import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Table, Collapse } from 'antd'
import { useEffect, useState } from 'react'
import userAPI from '~/api/userAPI'
import ModalUser from './ModalUser/ModalUser'
import ModalDelete from '~/components/ModalDelete'

function User() {
  const columnsParents = [
    {
      title: 'ID Phụ huynh',
      dataIndex: 'id'
    },
    {
      title: 'Tên Phụ huynh',
      dataIndex: 'fullName'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48'>
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' onClick={() => handleDeleteUser(data)} />
          </div>
        )
      }
    }
  ]
  const columnsDrivers = [
    {
      title: 'ID tài xế',
      dataIndex: 'id'
    },
    {
      title: 'Tên tài xế',
      dataIndex: 'fullName'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Chức năng',
      render: (data) => {
        return (
          <div className='w-48'>
            <EditOutlined className='text-yellow-500 text-2xl cursor-pointer mr-4' />
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' onClick={() => handleDeleteUser(data)} />
          </div>
        )
      }
    }
  ]
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [isModalUserDelete, setIsModalUserDelete] = useState(false)

  const [listParents, setListParents] = useState([])
  const [listDrivers, setListDrivers] = useState([])
  const [dataUserDelete, setDataUserDelete] = useState({})

  const handleCreateUser = () => {
    setIsModalUserOpen(true)
  }

  const handleDeleteUser = (data) => {
    setIsModalUserDelete(true)
    setDataUserDelete(data)
  }

  const items = [
    {
      key: '2',
      label: 'Danh sách phụ huynh',
      children: (
        <div>
          <Table columns={columnsParents} dataSource={listParents} />
        </div>
      )
    },
    {
      key: '3',
      label: 'Danh sách tài xế',
      children: (
        <div>
          <Table columns={columnsDrivers} dataSource={listDrivers} />
        </div>
      )
    }
  ]

  const fetchAllUsers = async () => {
    try {
      const parents = await userAPI.getAllParents()
      const drivers = await userAPI.getAllDrivers()
      setListParents(parents)
      setListDrivers(drivers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-4'>
          <Button type='primary' className='mb-4' onClick={handleCreateUser}>
            Tạo mới người dùng
          </Button>
          <Collapse items={items} />
        </div>
      </div>
      <ModalUser isOpen={isModalUserOpen} setIsModalUserOpen={setIsModalUserOpen} fetchAllUsers={fetchAllUsers} />
      <ModalDelete isModalOpen={isModalUserDelete} setIsModalOpen={setIsModalUserDelete} data={dataUserDelete} fetchAllUsers={fetchAllUsers} />
    </>
  )
}

export default User
