import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UploadImageCard from './UploadImageCard'
import { useDropzone } from 'react-dropzone'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import { ReactSortable } from 'react-sortablejs'

const ProductForm = ({
  _id,
  name: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImage,
  category: assignedCategory,
  properties: assignedProperties,
}) => {
  const [otherData, setOtherData] = useState({
    name: existingTitle || '',
    description: existingDescription || '',
    price: existingPrice || '',
    category: assignedCategory || '',
  })
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  )
  const [images, setImages] = useState(existingImage || [])
  const [loadingImage, setLoadingImage] = useState(false)
  const [maxFiles, setMaxFiles] = useState(10)
  const [categories, setCategories] = useState([])
  const [isFormValid, setIsFormValid] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const navigate = useNavigate()

  const fetchCategories = () => {
    axios.get('/api/categories').then((res) => {
      if (res.data.success) {
        setCategories(res.data.categories)
      }
    })
  }

  const propertiesToFill = []
  if (categories.length > 0 && otherData.category) {
    let catInfo = categories.find(({ _id }) => _id === otherData.category)
    propertiesToFill.push(...catInfo.properties)

    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      )
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const allFieldsFilled = Object.values(otherData).every(
      (value) => value != ''
    )
    setIsFormValid(allFieldsFilled)
  }, [otherData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOtherData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductPropChange = (e) => {
    const { name, value } = e.target
    setProductProperties((prev) => {
      const newProductProps = { ...prev }
      newProductProps[name] = value
      return newProductProps
    })
  }

  const handleSelectImage = (files) => {
    const validFileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ]

    if (files?.length > 0) {
      const totalFiles = images.length + files.length
      if (totalFiles > maxFiles) {
        alert(`Maximum ${maxFiles} fichiers autorisés.`)
        return
      }

      let selectedFiles = [...files]
      let isChecked = true

      selectedFiles.forEach((file) => {
        if (!validFileTypes.includes(file.type)) {
          isChecked = false
        }
      })

      if (!isChecked) {
        alert(
          'Type de fichier non supporté. Veuillez uploader des fichiers JPEG, PNG, GIF ou WebP.'
        )
        return
      }

      handleUploadSubmit(files)
    }
  }

  const handleFileChange = async (e) => {
    const { files } = e.target

    handleSelectImage(files)
  }

  const handleDrop = (files) => {
    handleSelectImage(files)
  }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: handleDrop,
    noClick: true,
  })

  const handleDeleteFile = async (image) => {
    let filename = image.split('\\')[1]
    try {
      const res = await axios.delete(`/api/files/delete/${filename}`)
      if (res.data.success) {
        setImages((prev) => prev.filter((pImage) => pImage !== image))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateImageOrder = (images) => {
    setImages(images)
  }

  const handleUploadSubmit = async (files) => {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    setLoadingImage(true)

    try {
      const res = await axios.post(`/api/files/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const { loaded, total } = e
          const percentProgress = Math.round((loaded * 100) / total)
          setUploadProgress(percentProgress)
        },
      })

      if (res.data.success) {
        setLoadingImage(false)
        setImages((prev) => [...prev, ...res.data.link])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { ...otherData, properties: productProperties, images }

    if (_id) {
      try {
        const res = await axios.put(`/api/products/update/${_id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (res.data.success) {
          alert('Product edit successfully')
          setOtherData({
            name: existingTitle || '',
            description: existingDescription || '',
            price: existingPrice || '',
            category: assignedCategory || '',
          })
          setProductProperties(assignedProperties || {})
          setImages(existingImage || [])
          navigate('/products')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await axios.post(`/api/products`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (res.data.success) {
          alert('Product save successfully')
          setOtherData({
            name: existingTitle || '',
            description: existingDescription || '',
            price: existingPrice || '',
            category: assignedCategory || '',
          })
          setProductProperties(assignedProperties || {})
          setImages(existingImage || [])
          navigate('/products')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <label>Product Name</label>
      <input
        name="name"
        value={otherData.name}
        onChange={handleInputChange}
        type="text"
        placeholder="Product name"
      />
      <label>Category</label>
      <select
        name="category"
        onChange={handleInputChange}
        value={otherData.category}
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p, index) => (
          <div key={index}>
            <div>{p.name[0].toUpperCase() + p.name.substring(1)}</div>
            <div>
              <select
                name={p.name}
                value={productProperties[p.name] || ''}
                onChange={handleProductPropChange}
              >
                <option value="" disabled>
                  Select {p.name}
                </option>
                {p.values.map((v, index) => (
                  <option key={index} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label className="flex gap-2">
        <div>Photo</div>
        <div>
          {images.length} / {maxFiles}
        </div>
      </label>
      <div
        {...getRootProps()}
        className="flex items-center justify-center border-2 border-dashed h-[180px] border-gray-200 rounded-md pl-2"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <label>
            <HiOutlineCloudArrowUp className="w-16 h-16  cursor-pointer text-gray-400 hover:text-gray-500" />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="line-clamp-1 text-gray-700">
            Drag & drop a file here, or click to select a file
          </p>
        </div>
      </div>
      <div className="mb-2 py-2">
        <ReactSortable
          className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 "
          list={images}
          setList={handleUpdateImageOrder}
        >
          {!!images?.length &&
            images.map((image, index) => (
              <UploadImageCard
                key={index}
                handleDelete={() => handleDeleteFile(image)}
                src={`http://localhost:5000/${image}`}
              />
            ))}
        </ReactSortable>
      </div>

      <label>Description</label>
      <textarea
        name="description"
        value={otherData.description}
        onChange={handleInputChange}
        placeholder="Description"
      ></textarea>
      <label>Price (in FCFA)</label>
      <input
        name="price"
        value={otherData.price}
        onChange={handleInputChange}
        type="number"
        min={0}
        placeholder="Price"
      />
      <button
        disabled={!isFormValid}
        onClick={handleSubmit}
        className={`btn-primary disabled:btn-default disabled:cursor-not-allowed`}
      >
        Save
      </button>
    </div>
  )
}

export default ProductForm
