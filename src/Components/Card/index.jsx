import { useContext } from "react"
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from "../../Context";

function Card({ data }) {
    const context = useContext(ShoppingCartContext);

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setProductToShow(productDetail)
        context.closeCheckoutSideMenu()
    }

    const addProductsToCart = (event, productData) => {
        event.stopPropagation()
        context.setCount(context.count + 1)
        context.setCartProducts([...context.cartProducts, productData])
        context.openCheckoutSideMenu()
        context.closeProductDetail()
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter((product) => product.id === id).length > 0
        if (isInCart) {
            return (
                <div className="absolute top-0 right-0 flex justify-center items-center bg-orange-500 w-6 h-6 rounded-full m-2 cursor-default"
                    onClick={(event) => event.stopPropagation()}
                >
                    <CheckIcon
                        className='h-4 w-4 text-white'
                    ></CheckIcon>
                </div>)
        } else {
            return (
                <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 hover:bg-white/90  "
                    onClick={(event) => addProductsToCart(event, data)}
                >
                    <PlusIcon
                        className='h-4 w-4 text-gray-700'
                    ></PlusIcon>
                </div>
            )
        }
    }
    return (
        <div
            className="bg-white cursor-pointer h-60 rounded-lg"
            onClick={() => showProduct(data)}
        >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.category.name}</span>
                <img className="w-full h-full object-cover rounded-lg"
                    src={data.images[0]} alt={data.title} />
                {renderIcon(data.id)}
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{data.title}</span>
                <span className="bg-gray-800 px-3 pt-0.5 pb-1 text-gray-200 text-sm font-medium rounded-full">${data.price}</span>
            </p>
        </div>
    )
}

export { Card }