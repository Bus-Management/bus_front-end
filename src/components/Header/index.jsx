import { DoubleRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
      <div className=' bg-blue-500 '>
        <div className='container text-white'>
          <div className='h-14 flex justify-between items-center'>
            <p className='font-medium text-xl flex items-center cursor-pointer'>
              <DoubleRightOutlined className='mr-2 text-2xl h-4' />
              <span>NINO BUS</span>
            </p>
            <div>
              <span className='mr-2'>0989898989</span>
              <NavLink to='/login'>
                <Button>Đăng nhập</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
