import { useState } from 'react'
import Sidebar from './Sidebar'
import { HiBuildingStorefront, HiOutlineBars3 } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center p-4 gap-2">
        <button onClick={handleShowSidebar}>
          <HiOutlineBars3 className="w-6 h-6" />
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <div>
          <Sidebar show={showSidebar} />
        </div>
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  )
}

export default Layout
