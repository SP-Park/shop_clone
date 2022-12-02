import React from 'react'
import { Link } from 'react-router-dom'
import { BiShoppingBag } from 'react-icons/bi'
import { BsFillPencilFill } from 'react-icons/bs'
import User from './User'
import Button from './Button'
import CartStatus from './CartStatus'
import { useAuthContext } from '../context/AuthContext'

function Navbar() {
  const { user, login, logout } = useAuthContext()
  return (
    <header className='flex justify-between border-b border-gray-600 p-2'>
        <Link to='/' className='flex items-center text-4xl text-brand'>
            <BiShoppingBag className='mr-2'/>
            <h1>My Shop</h1>
        </Link>
        <nav className='flex items-center gap-4 font-semibold'>
            <Link to='/products'>Products</Link>
            {user && <Link to='/carts'><CartStatus /></Link>}
            {user && user.isAdmin && <Link to='/products/new'><BsFillPencilFill /></Link>}
            {user && <User user={user} />}
            {user && <Button text={'Logout'} onClick={logout} />}
            {!user && <Button text={'Login'} onClick={login} />}
        </nav>
    </header>
  )
}

export default Navbar