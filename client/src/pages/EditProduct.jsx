import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductForm from '../components/ProductForm'

const EditProduct = () => {
  const { id } = useParams()
  const [productInfo, setProductInfo] = useState(null)

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get(`/api/products/id/${id}`).then((res) => {
      if (res.data.success) {
        setProductInfo(res.data.product)
      }
    })
  }, [id])

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}

export default EditProduct
