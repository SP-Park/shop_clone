import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../apis/uploader'
import Button from '../components/Button'
import useProducts from '../hooks/useProducts'
// import { addNewProduct } from '../apis/firebase'
// import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

function NewProduct() {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState() // URL을 넣어줘야 함
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState()
  const { addProduct } = useProducts()
  const navigate = useNavigate()

  // Mutation step 1 - stale 타임을 사용하는 경우 즉각적인 업데이트를 위해 invalid 해주기 위함
  // const queryClient = useQueryClient()
  // const addProduct = useMutation(({ product, url }) => addNewProduct(product, url), {
  //   onSuccess: () => queryClient.invalidateQueries(['products'])
  // })
  // //  customHook 으로 이동 useProducts.jsx


  const handleChange = (e) => {
    const { name, value, files } = e.target
    if(name === 'file') {
        setFile(files && files[0])
        return
    }
    setProduct((it) => ({ ...it, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsUploading(true)
    uploadImage(file)
    .then((url) => {
      // Mutation step 2
      addProduct.mutate(
        { product, url },
        {
          onSuccess: () => {   // onSuccess를 또 할수 있다.
            setSuccess('성공적으로 제품이 추가되었습니다.')  
            setTimeout(() => {
                setSuccess(null)
                navigate('/')
            }, 3000)
          }
        } 
        )
        //
        // Mutate 적용 전은 아래
        // addNewProduct(product, url)
        // .then(() => {
        //     setSuccess('성공적으로 제품이 추가되었습니다.')  
        //     setTimeout(() => {
        //         setSuccess(null)
        //     }, 3000)
        // })
    })
    .finally(() => setIsUploading(false))
  }
  return (
    <section className='w-full text-center'>
        <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
        {success && <p className='my-2'>✅{success}</p>}
        {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='cloth'/>}
        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
            <input type='file' accept='image/*' name='file' required onChange={handleChange} />
            <input type='text' name='title' placeholder='제품명' value={product.title ?? ''} required onChange={handleChange}/>
            <input type='number' name='price' value={product.price ?? ''} placeholder='가격' required onChange={handleChange}/>
            <input type='text' name='category' value={product.category ?? ''} placeholder='카테고리' required onChange={handleChange}/>
            <input type='text' name='description' value={product.description ?? ''} placeholder='제품 설명' required onChange={handleChange}/>
            <input type='text' name='options' value={product.options ?? ''} placeholder='옵션들(콤마(,)로 구분)' required onChange={handleChange}/>
            <Button text={isUploading ? '등록중...':'제품 등록하기'} disable={isUploading}/>
        </form>
    </section>
  )
}

export default NewProduct