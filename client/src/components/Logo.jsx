import { HiBuildingStorefront } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'} className="flex gap-2">
      <HiBuildingStorefront className="w-6 h-6" />
      <span>Ecommerce Admin</span>
    </Link>
  )
}

export default Logo
