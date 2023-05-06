import { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';
import './styles.css'


function ProductDetail() {
    const context = useContext(ShoppingCartContext);
    console.log(context.productToShow);
    return (
        <aside
            className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed right-0 border border-gray-400 rounded-lg bg-white`}
        >
            <div className='flex justify-between items-center p-4'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <div
                    className='cursor-pointer '
                    onClick={() => context.closeProductDetail()} >
                    <XCircleIcon className='h-8 w-8 text-gray-700 hover:text-gray-500'></XCircleIcon>
                </div>
            </div>
            <figure className='px-3'>
                <img
                    className='w-full h-full rounded-lg'
                    src={context.productToShow.images?.[0]} alt="" />
            </figure>
            <div className='flex flex-col py-4 px-8  gap-5'>
                <div className='flex justify-between'>
                    <span className='font-semibold text-lg'>{context.productToShow.title}</span>
                    <span className='font-semibold text-lg text-orange-400'>${context.productToShow.price}</span>
                </div>
                <div className='flex flex-col gap-3 px-2'>
                    <span className='font-semibold text-sm'>Description:</span>
                    <span className='font-light text-xs mb-2'>  {context.productToShow.description}</span>
                </div>

            </div>
        </aside>
    )
}

export { ProductDetail }