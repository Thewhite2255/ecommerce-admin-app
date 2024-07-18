const Drawer = ({ open, onClose, children }) => {
  return (
    open && (
      <div className="fixed inset-0 z-10 flex">
        <div onClick={onClose} className="fixed inset-0 bg-black/20"></div>
        <div
          className="relative w-80 bg-white shadow-md overflow-auto"
          style={{
            transform: open ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      </div>
    )
  )
}

export default Drawer
