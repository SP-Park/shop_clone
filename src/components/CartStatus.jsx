// import { useQuery } from '@tanstack/react-query'
import React from 'react'
// import { getCart } from '../apis/firebase'
// import { useAuthContext } from '../context/AuthContext'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import useCart from '../hooks/useCart'

function CartStatus() {
  // const { user } = useAuthContext()
  // const { data: products} = useQuery(['carts'], () => getCart(user.uid))
  const { cartQuery: { data: products } } = useCart()
  
  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && <p className='w-6 h-6 text-center bg-red-700 text-white font-bold rounded-full absolute -top-1 -right-1'>{products.length}</p>}
    </div>
  )
}

export default CartStatus


