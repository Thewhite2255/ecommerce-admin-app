import { useState } from 'react'
import { HiOutlineTrash, HiOutlineXMark } from 'react-icons/hi2'
import Modal from './Modal'

const UploadImageCard = ({ key, src, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div key={key}>
      <div className="relative bg-white ring-1 ring-black ring-opacity-5 hover:ring-gray-200 p-2 cursor-pointer overflow-hidden rounded-md hover:shadow-md flex items-center justify-center">
        <img
          src={src}
          onClick={handleOpenModal}
          className="max-w-full max-h-32 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleDelete}
            className="p-2 bg-black rounded-full shadow-md ring-1 ring-black ring-opacity-5 text-white text-white/90 hover:text-red-500 hover:bg-white"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Modal open={isOpen}>
        <div className="flex justify-center items-center">
          <div className="mx-auto max-md:h-[80vh] h-screen">
            <img src={src} className="h-full object-cover" />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleCloseModal}
              className="p-2 bg-black rounded-full text-white text-white/90 hover:text-black hover:bg-white"
            >
              <HiOutlineXMark className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UploadImageCard
