import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import { addOrUpdateToCart } from '../apis/firebase'
import Button from '../components/Button'
// import { useAuthContext } from '../context/AuthContext'
import useCart from '../hooks/useCart'

function ProductDetail() {

  const navigate = useNavigate()
  const { addOrUpdateItem } = useCart()
  const [success, setSuccess] = useState()
  // const { user } = useAuthContext() 
  const { state: { product: { id, image, title, description, category, price, options  }}} = useLocation()
  const [selected, setSelected] = useState(options && options[0])
  const handleSelect = (e) => {
    setSelected(e.target.value)
  }
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected,  quantity: 1 } 
    // addOrUpdateToCart(user.uid, product)
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.')
        setTimeout(() => {
          setSuccess(null)
          navigate('/')
        }, 3000)
        
      }
    })
  }
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img className='w-full px-4 basis-7/12' alt={title} src={image}/>
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>{price}원</p>
          <p className='text-lg py-4'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>옵션: </label>
            <select className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' id='select' value={selected} onChange={handleSelect}>
              {options.map((it, idx) => (
                <option key={idx}>{it}</option>
              ))}
            </select>
          </div>
          {success && <p className='my-2'>{success}</p>}
          <Button text={'장바구니에 추가'} onClick={handleClick}/>
        </div>
      </section>
    </>
  )
}

export default ProductDetail