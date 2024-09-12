import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Table, Collapse } from 'antd'
import { useEffect, useState } from 'react'
import userAPI from '~/api/userAPI'

function User() {
  const columnsChildrens = [
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
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' />
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
            <DeleteOutlined className='text-red-500 text-2xl cursor-pointer' />
          </div>
        )
      }
    }
  ]

  const [listChildrens, setListChildrens] = useState([])
  const [listParents, setListParents] = useState([])
  const [listDrivers, setListDrivers] = useState([])

  const items = [
    {
      key: '1',
      label: 'Danh sách học sinh',
      children: (
        <div>
          <Table columns={columnsChildrens} dataSource={listChildrens} />
        </div>
      )
    },
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
      const childrens = await userAPI.getAllChildrens()
      const parents = await userAPI.getAllParents()
      const drivers = await userAPI.getAllDrivers()
      setListChildrens(childrens)
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
          <Button type='primary' className='mb-4'>
            Tạo người dùng
          </Button>
          <Collapse items={items} />
        </div>
      </div>
    </>
  )
}

export default User
