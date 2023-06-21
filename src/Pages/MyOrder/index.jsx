import { useContext } from 'react'
import { Link } from 'react-router-dom';

import { ChevronLeftIcon } from '@heroicons/react/24/solid'

import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context';
import { OrderCard } from '../../Components/OrderCard';



function MyOrder() {

    const context = useContext(ShoppingCartContext);
    const currentPath = window.location.pathname
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)

    if (index === 'last') index = context.order?.length - 1



    return (
        <Layout>
            <div className='flex items-center justify-center w-80 relative'>
                <Link to='/my-orders' className='absolute left-0'>
                    <ChevronLeftIcon
                        className='h-5 w-5 text-gray-700 hover:text-gray-500'
                    ></ChevronLeftIcon>
                </Link>
                <h1 className='text-xl font-semibold'>
                    My Order
                </h1>
            </div>
            <div className='flex flex-col w-80 mt-8'>
                {context.order?.[index]?.products.map((product) => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.images[0]}
                        price={product.price}
                    />
                ))}
            </div>
            <div className='w-80 border-t-2 my-4 pt-2'>
                <p className='font-bold'>Total: <span className='font-light'>${context.order?.[index]?.totalPrice}</span></p>
            </div>

        </Layout>
    )
}

export { MyOrder }