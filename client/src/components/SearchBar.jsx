import { useState } from 'react'
import Input from './Input'
import { MdOutlineClose, MdOutlineSearch } from 'react-icons/md'

const SearchBar = ({ search, setSearch, ...props }) => {
  const [isTyping, setIsTyping] = useState(false)

  const handleChange = (e) => {
    const { value } = e.target
    setSearch(value)

    setIsTyping(!isTyping)
  }

  const handleClear = () => {
    setSearch('')
  }

  return (
    <form action="/all-products/" autoComplete="off">
      <Input
        {...props}
        type="text"
        name="query"
        value={search}
        onChange={handleChange}
        placeholder="Rechercher un produit..."
        leftIcon={<MdOutlineSearch className="w-6 h-6 text-slate-400" />}
        rightIcon={
          search !== '' && (
            <MdOutlineClose
              onClick={handleClear}
              className="w-5 h-5 cursor-pointer text-custom-light hover:text-accent-dark"
            />
          )
        }
      />
    </form>
  )
}

export default SearchBar
