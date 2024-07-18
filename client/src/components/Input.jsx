const Input = ({ label, rightIcon, leftIcon, errorMsg, ...props }) => {
  return (
    <>
      {label && (
        <div className="mb-2">
          <label className="text-slate-700">{label}</label>
        </div>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            {leftIcon}
          </span>
        )}
        {props.name === 'query' ? (
          <input
            {...props}
            className="block w-full px-9 py-2 text-slate-700 placeholder:text-slate-400/70 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        ) : (
          <input
            {...props}
            className="block w-full px-4 py-2 text-slate-700 placeholder:text-slate-400/70 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        )}
        {rightIcon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightIcon}
          </span>
        )}
      </div>
      {errorMsg && (
        <div className="mt-2 text-sm break-words text-danger">{errorMsg}</div>
      )}
    </>
  )
}

export default Input
