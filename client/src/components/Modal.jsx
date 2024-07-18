const Modal = ({ open, onClose, children }) => {
  return (
    open && (
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      >
        <div onClick={(e) => e.stopPropagation()} className="w-full">
          {children}
        </div>
      </div>
    )
  )
}

export default Modal
