// import { useQuery } from '@tanstack/react-query'
import React from 'react'
// import { getCart } from '../apis/firebase'
import { useAuthContext } from '../context/AuthContext'
import { FaEquals } from 'react-icons/fa'
import { BsPlusCircleFill } from 'react-icons/bs'
import CartItem from '../components/CartItem'
import PriceCard from '../components/PriceCard'
import Button from '../components/Button'
import useCart from '../hooks/useCart'

const Shipping = 3000

function MyCart() {
  const { user } = useAuthContext()
  // const { isLoading, data: products } = useQuery(['carts'], () => getCart(user.uid))
  const { cartQuery: { isLoading, data: products } } = useCart()
  
  if(isLoading) return <p>Loading....</p>

  const hasProducts = products && products.length >= 1
  const totalPrice = products && 
    products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0)

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-500'>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts &&
        <>
          <ul className='border-b border-gray-400 mb-8 p-4 px-8'>
            {products && products.map((it) => (
              <CartItem key={it.id} product={it} uid={user.uid} />
            ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text={'상품 총액'} price={totalPrice} />
            <BsPlusCircleFill  className='shrink-0'/>
            <PriceCard text='배송비' price={Shipping} />
            <FaEquals className='shrink-0'/>
            <PriceCard text='총가격' price={totalPrice + Shipping} />
          </div>
          <Button text='주문하기' />
        </>
      }

    </section>
  )
}

export default MyCart