import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';


function Navbar() {
    const context = useContext(ShoppingCartContext);
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
                        {parsedAccount?.email}
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
        <nav className='w-full py-5 px-8 text-sm font-sans flex justify-between items-center fixed z-50 top-0 bg-white border border-gray-200'>
            <ul className='flex items-center gap-4'>
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
            <ul className='flex items-center gap-4'>
                {renderView()}
                <li className={`${hasUserAnAccount && !isUserSignOut ? 'flex' : 'hidden'} items-center gap-1 relative`}>
                    <ShoppingCartIcon className='h-4 w-4 text-gray-700  hover:text-gray-500 z-10 cursor-pointer'
                        onClick={() => {
                            context.openCheckoutSideMenu(true)
                        }}
                    ></ShoppingCartIcon>
                    <div className={`${context.cartProducts.length > 0 ? 'flex' : 'hidden'}  bg-orange-600 text-white text-[11px] w-5 h-5 rounded-full items-center justify-center absolute -right-4 -top-2`}>
                        <p>{context.cartProducts.length}</p>

                    </div>
                </li>
            </ul>
        </nav>
    )
}

export { Navbar }