import { Link, useLocation } from 'react-router-dom'
import {
  HiBuildingStorefront,
  HiOutlineArchiveBox,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineListBullet,
  HiOutlineQueueList,
} from 'react-icons/hi2'
import axios from 'axios'
import Logo from './Logo'

const Sidebar = ({ show }) => {
  const { pathname } = useLocation()

  const items = [
    {
      path: '/',
      name: 'Dashboard',
      icon: HiOutlineHome,
    },
    {
      path: '/products',
      name: 'Products',
      icon: HiOutlineArchiveBox,
    },
    {
      path: '/categories',
      name: 'Categories',
      icon: HiOutlineListBullet,
    },
    {
      path: '/orders',
      name: 'Orders',
      icon: HiOutlineQueueList,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: HiOutlineCog6Tooth,
    },
  ]

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <aside
      className={`${
        show ? 'left-0' : '-left-full'
      } transition-all text-gray-500 z-[100] p-4 fixed top-0 w-full h-full bg-bgGray md:static`}
    >
      <div className="mb-4 mr-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2">
        {items.map((item, index) =>
          index < 1 ? (
            <Link
              key={index}
              to={item.path}
              className={`flex gap-2 p-1 ${
                pathname === item.path &&
                'bg-highlight text-primary font-semibold rounded-sm'
              } `}
            >
              <item.icon className="w-6 h-6" />
              <span> {item.name}</span>
            </Link>
          ) : (
            <Link
              key={index}
              to={item.path}
              className={`flex gap-2 p-1 ${
                pathname.includes(item.path) &&
                'bg-highlight text-primary font-semibold rounded-sm '
              } `}
            >
              <item.icon className="w-6 h-6" />
              <span> {item.name}</span>
            </Link>
          )
        )}
        <button onClick={handleLogout} className="flex gap-2 p-1">
          <HiOutlineArrowLeftOnRectangle className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
