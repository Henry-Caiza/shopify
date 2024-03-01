import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartIcon, XMarkIcon, Bars4Icon } from '@heroicons/react/24/solid'

import { ShoppingCartContext } from '../../Context';

function Navbar() {
    const context = useContext(ShoppingCartContext);
    const [isOpen, setIsOpen] = useState(false)
    const activeStyle = 'text-orange-400 underline decoration-2 underline-offset-4'
    //sign out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut
    //account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    //has account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalState || !noAccountInLocalStorage
    useEffect(() => {
        renderView()
    }, [])
    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
    }


    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className='text-black/60'>
                        {
                            parsedAccount?.email.split('@')[0]
                        }
                        @
                    </li>
                    <li>
                        <NavLink
                            to='/my-orders'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/my-account'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/sign-in'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => handleSignOut()}
                        >
                            Sign out
                        </NavLink>
                    </li>

                </>
            )
        } else {
            return (
                <li>
                    <NavLink
                        to="/sign-in"
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}
                    >
                        Sign in
                    </NavLink>
                </li>

            )
        }
    }
    return (
        <nav className='w-full py-5 px-2 md:px-8 text-sm font-sans flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center fixed z-50 top-0 bg-white border border-gray-200'>
            <ul className='hidden md:flex items-center gap-4 '>
                <li className='font-semibold text-lg '>
                    <NavLink
                        to={`${isUserSignOut ? '/sign-in' : '/'}`}
                    >
                        Shopify
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => context.setSearchByCategory('')}
                    >
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/clothes'
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => context.setSearchByCategory('clothes')}
                    >
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/electronics'
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => context.setSearchByCategory('electronics')}
                    >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/furnitures'
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => context.setSearchByCategory('furniture')}
                    >
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/shoes'
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => context.setSearchByCategory('shoes')}
                    >
                        Shoes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/others'
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => context.setSearchByCategory('others')}
                    >
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className='max-md:w-full flex items-center justify-between md:justify-center gap-1 sm:gap-2 md:gap-4'>
                {renderView()}
                <li className={`${hasUserAnAccount && !isUserSignOut ? 'flex' : 'hidden'} items-center gap-3 sm:gap-4 `}>
                    <div className='relative'>
                        <ShoppingCartIcon className='h-5 w-5 text-gray-700  hover:text-gray-500 z-10 cursor-pointer'
                            onClick={() => {
                                context.openCheckoutSideMenu(true)
                            }}
                        />
                        <div className={`${context.cartProducts.length > 0 ? 'flex' : 'hidden'}  bg-orange-600 text-white text-[11px] w-4 h-4 md:w-5 md:h-5 rounded-full items-center justify-center absolute -right-2 md:-right-4 -top-2`}>
                            <p className='text-xs md:text-base'>{context.cartProducts.length}</p>
                        </div>
                    </div>
                    {
                        isOpen ? <XMarkIcon className='flex md:hidden h-6 w-6 text-gray-700  hover:text-gray-500 z-10 cursor-pointer' onClick={() => setIsOpen(!isOpen)} /> :
                            <Bars4Icon className='flex md:hidden h-6 w-6 text-gray-700  hover:text-gray-500 z-10 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                    }


                </li>
            </ul>
            {
                isOpen && <ul className='flex flex-col items-center gap-4 '>
                    <li className='font-semibold text-lg' onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to={`${isUserSignOut ? '/sign-in' : '/'}`}
                        >
                            Shopify
                        </NavLink>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to='/'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory('')}
                        >
                            All
                        </NavLink>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to='/clothes'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory('clothes')}
                        >
                            Clothes
                        </NavLink>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to='/electronics'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory('electronics')}
                        >
                            Electronics
                        </NavLink>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to='/furnitures'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory('furniture')}
                        >
                            Furnitures
                        </NavLink>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to='/shoes'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory('shoes')}
                        >
                            Shoes
                        </NavLink>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                        <NavLink
                            to='/others'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory('others')}
                        >
                            Others
                        </NavLink>
                    </li>
                </ul>
            }

        </nav>
    )
}

export { Navbar }