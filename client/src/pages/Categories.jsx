import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'
import DeleteModal from '../components/DeleteModal'

const Categories = () => {
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState(null)
  const [deletedCategory, setDeletedCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [properties, setProperties] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const fetchCategories = () => {
    axios.get('/api/categories').then((res) => {
      if (res.data.success) {
        setCategories(res.data.categories)
      }
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
    }
    if (name === 'parentCategory') {
      setParentCategory(value)
    }
  }

  const handlePropertyChange = (e, index) => {
    const { name, value } = e.target
    setProperties((prev) => {
      const properties = [...prev]
      properties[index][name] = value
      return properties
    })
  }

  const handleAddProperty = () => {
    setProperties((prev) => [...prev, { name: '', values: '' }])
  }
  const handleRemoveProperty = (index) => {
    setProperties((prev) => prev.filter((p, pIndex) => pIndex !== index))
  }

  const handleDeleteBtn = async (category) => {
    setIsOpen(true)
    setDeletedCategory(category)
  }

  const handleDeleteCategory = async () => {
    try {
      const res = await axios.delete(`/api/categories/${deletedCategory._id}`)

      if (res.data.success) {
        alert('Product delete successfully')
        setIsOpen(false)
        setEditedCategory(null)
        fetchCategories()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditedCategory = (category) => {
    setParentCategory('')
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
    setProperties(
      category.properties.map(({ name, values }) => ({
        name: name,
        values: values.join(','),
      }))
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(','),
      })),
    }

    if (editedCategory) {
      try {
        const res = await axios.put(
          `/api/categories/${editedCategory._id}`,
          data
        )

        if (res.data.success) {
          setEditedCategory(null)
          setProperties([])
          setName('')
          setParentCategory('')
          fetchCategories()
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await axios.post(`/api/categories`, data)

        if (res.data.success) {
          setName('')
          setParentCategory('')
          setProperties([])
          fetchCategories()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : 'New Category Name'}
      </label>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1">
          <input
            type="text"
            name="name"
            placeholder="Category name"
            value={name}
            onChange={handleChange}
          />
          <select
            name="parentCategory"
            onChange={handleChange}
            value={parentCategory}
          >
            <option value="" disabled>
              No category parent
            </option>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={handleAddProperty}
            type="button"
            className="btn-primary text-sm"
          >
            Add new property
          </button>
        </div>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input
                type="text"
                name="name"
                className="mb-0"
                value={property.name}
                onChange={(e) => handlePropertyChange(e, index)}
                placeholder="property name (example: color)"
              />
              <input
                type="text"
                name="values"
                className="mb-0"
                value={property.values}
                onChange={(e) => handlePropertyChange(e, index)}
                placeholder="values, comma separated"
              />
              <button
                type="button"
                onClick={() => handleRemoveProperty(index)}
                className="btn-red"
              >
                Remove
              </button>
            </div>
          ))}
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null)
                setName('')
                setParentCategory('')
                setProperties([])
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button
            disabled={name === '' && true}
            type="submit"
            className={`${
              name !== '' ? 'btn-primary' : 'btn-default cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>{category.parent?.name}</td>

                <td>
                  <button
                    className="btn-default"
                    onClick={() => handleEditedCategory(category)}
                  >
                    <HiOutlinePencilSquare className="w-5 h-5" />
                    Edit
                  </button>
                  <button
                    className="btn-red"
                    onClick={() => handleDeleteBtn(category)}
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteModal
        data={deletedCategory}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDeleteCategory}
      />
    </Layout>
  )
}

export default Categories
