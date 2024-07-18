import Modal from '../components/Modal'

const DeleteModal = ({ isOpen, setIsOpen, data, handleDelete }) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-white mx-auto w-max px-16 py-8 rounded-md shadow-lg">
        <div className="text-center">
          <h1 className="mb-0 font-bold">Are you sure?</h1>
          <h2 className="my-2">Do you want to delete {data && data.name}?</h2>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          <button onClick={handleClose} className="btn-default">
            Cancel
          </button>
          <button onClick={handleDelete} className="btn-red">
            Yes, Delete!
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
