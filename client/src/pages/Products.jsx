import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'
import DeleteModal from '../components/DeleteModal'

const Products = () => {
  const [products, setProducts] = useState([])
  const [productInfo, setProductInfo] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios.get('/api/products').then((res) => {
      if (res.data.success) {
        setProducts(res.data.products)
      }
    })
  }

  const handleDeleteBtn = async (product) => {
    setIsOpen(true)
    setProductInfo(product)
  }

  const handleDeleteProduct = async () => {
    try {
      const res = await axios.delete(`/api/products/id/${productInfo._id}`)

      if (res.data.success) {
        alert('Product delete successfully')
        setIsOpen(false)
        setProductInfo(null)
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <h1>Products</h1>
      <Link to={'/products/new'} className="mt-4 btn-primary">
        Add new products
      </Link>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <Link
                  to={`/products/edit/${product._id}`}
                  className="btn-default"
                >
                  <HiOutlinePencilSquare className="w-5 h-5" />
                  Edit
                </Link>
                <button
                  className="btn-red"
                  onClick={() => handleDeleteBtn(product)}
                >
                  <HiOutlineTrash className="w-5 h-5" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        data={productInfo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDeleteProduct}
      />
    </Layout>
  )
}

export default Products
