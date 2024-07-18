import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Modal from '../components/Modal'

const DeleteProduct = () => {
  const { id } = useParams()
  const [productInfo, setProductInfo] = useState(null)

  const navigate = useNavigate()

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

  const goBack = () => {
    navigate('/products')
  }

  const deteleProduct = async () => {
    try {
      const res = await axios.delete(`/api/products/id/${id}`)

      if (res.data.success) {
        alert('Product delete succeffully')
        goBack()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal open={true}>
      <div className="bg-white mx-auto max-w-md px-6 py-4 rounded-md shadow-lg">
        <h1 className="mb-4 text-center">
          Do you really want to delete &nbsp; {productInfo && productInfo.title}
          ?
        </h1>
        <div className="flex gap-2 justify-end">
          <button onClick={goBack} className="btn-default">
            Cancel
          </button>
          <button onClick={deteleProduct} className="btn-red">
            Yes, Delete!
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProduct
