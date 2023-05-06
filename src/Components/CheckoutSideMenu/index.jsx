import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';
import { OrderCard } from '../OrderCard';
import { totalPrice } from '../../utils';

import './styles.css'


function CheckoutSideMenu() {
    const context = useContext(ShoppingCartContext);

    const handleDelete = (id) => {
        const filterProducts = context.cartProducts.filter((product) => product.id != id)
        context.setCartProducts(filterProducts)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setSearchByTitle('')
        context.closeCheckoutSideMenu(true)
    }

    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex flex-col fixed right-0 border border-gray-200 rounded-lg bg-white`}
        >
            <div className='flex justify-between items-center p-4'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div
                    className='cursor-pointer '
                    onClick={() => context.closeCheckoutSideMenu()} >
                    <XCircleIcon className='h-8 w-8 text-gray-700 hover:text-gray-500'></XCircleIcon>
                </div>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
                {context.cartProducts.map((product) => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.images[0]}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <div className='px-6 mt-3 mb-6 flex flex-col gap-4'>
                <p className='flex justify-between items-center border-t-2'>
                    <span className='font-semibold text-lg pt-3'>Total: </span>
                    <span className='font-semibold text-lg'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button
                        className='w-full bg-orange-500 text-white  my-0 rounded-full py-1 hover:bg-orange-600'
                        onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>

        </aside>
    )
}

export { CheckoutSideMenu }