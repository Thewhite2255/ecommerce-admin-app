import {
  MdOutlineClose,
  MdOutlineMenu,
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from 'react-icons/md'
import SearchBar from './SearchBar'
import Drawer from './Drawer'
import { useState } from 'react'
import Modal from './Modal'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState({ drawer: false }, { modal: false })

  const handleOpen = (target) => setOpen({ ...open, [target]: true })
  const handleClose = (target) => setOpen({ ...open, [target]: false })

  return (
    <div className="nav sticky top-0 shadow-md z-10 px-4 bg-white h-16 flex items-center">
      <div className="wrapper w-full flex items-center justify-between">
        <div className="left flex items-center gap-2">
          <div
            onClick={() => handleOpen('drawer')}
            className="p-2 cursor-pointer lg:hidden hover:bg-accent-light active:bg-accent rounded-md"
          >
            <MdOutlineMenu className="w-6 h-6" />
          </div>
          <div className="logo">
            <div className="logo-text flex items-center gap-2">
              <span className="text-3xl font-bold font-mono">E</span>commerce
            </div>
          </div>
          <div className="max-lg:hidden flex items-center gap-2 ml-4">
            <Link to="/" className="py-2 px-4 rounded-md hover:bg-slate-100">
              Accueil
            </Link>
            <Link
              to="/shop"
              className="py-2 px-4 rounded-md hover:bg-slate-100"
            >
              Boutique
            </Link>
            <Link
              to="/contact"
              className="py-2 px-4 rounded-md hover:bg-slate-100"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="py-2 px-4 rounded-md hover:bg-slate-100"
            >
              À propos
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="icons flex items-center gap-2">
            <div className="max-xl:hidden w-60">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <div
              onClick={() => handleOpen('modal')}
              className="p-2 cursor-pointer xl:hidden hover:bg-accent-light active:bg-accent rounded-md"
            >
              <MdOutlineSearch className="w-6 h-6" />
            </div>
            <div className="p-2 cursor-pointer hover:bg-accent-light active:bg-accent rounded-md">
              <MdOutlineShoppingCart className="w-6 h-6" />
            </div>
            <div className="p-2 cursor-pointer hover:bg-accent-light active:bg-accent rounded-md">
              <MdOutlinePerson className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <Drawer open={open['drawer']} onClose={() => handleClose('drawer')}>
        <div className="sticky top-0 shadow-md px-4 z-10 h-16 bg-white flex items-center">
          <div className="left flex items-center gap-2">
            <div
              onClick={() => handleClose('drawer')}
              className="p-2 cursor-pointer hover:bg-accent-light active:bg-accent rounded-md"
            >
              <MdOutlineClose className="w-6 h-6" />
            </div>
            <div className="logo">
              <div className="logo-text">E-commerce</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex flex-col">
            <Link to="/" className="py-2 px-4 rounded-md hover:bg-slate-100">
              Accueil
            </Link>
            <Link
              to="/shop"
              className="py-2 px-4 rounded-md hover:bg-slate-100"
            >
              Boutique
            </Link>
            <Link
              to="/contact"
              className="py-2 px-4 rounded-md hover:bg-slate-100"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="py-2 px-4 rounded-md hover:bg-slate-100"
            >
              À propos
            </Link>
          </div>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </Drawer>

      <Modal open={open['modal']} onClose={() => handleClose('modal')}>
        <div className="bg-white max-w-md mx-auto rounded-md shadow-md px-4 py-6">
          <SearchBar search={search} setSearch={setSearch} autoFocus="on" />
        </div>
      </Modal>
    </div>
  )
}

export default Navbar
