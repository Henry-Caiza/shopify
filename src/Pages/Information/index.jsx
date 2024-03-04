import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { ChevronLeftIcon } from '@heroicons/react/24/solid'

import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context';
import { OrderCard } from '../../Components/OrderCard';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyInformation() {
    const context = useContext(ShoppingCartContext);
    const navigate = useNavigate()
    // const currentPath = window.location.pathname
    //let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)

    //if (index === 'last') index = context.order?.length - 1
    let index = context.preOrder?.length - 1
    if (context.preOrder?.length === 0) {
        navigate('/');
    }
    const form = useRef(null)


    const handleCheckout = () => {
        const orderToAdd = [...context.preOrder]
        context.setOrder(orderToAdd)
        //context.setPreOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setSearchByTitle('')
        context.closeCheckoutSideMenu(true)
    }

    // console.log(context.order);
    const paypalOptions = {
        clientId: 'AYrVyRxmATzQHa5CFXIxDkpbNcE2F5MS_Nf5-_b3fpbS67HMM-YshABgT0IBDaYqI6W5_MQNriLnxpQB',
        intent: 'capture',
        currency: 'USD'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (data) {
            handlePaymentSuccess(data);
        });
    };

    const handlePaymentSuccess = (data) => {

        if (data.status === 'COMPLETED') {
            handleCheckout()
            navigate('/my-orders/last');
        }
    }

    //console.log(context.preOrder?.[index]?.totalPrice);

    return (
        <Layout>
            <div className="w-full px-4 lg:px-0 lg:w-3/4 flex flex-col md:flex-row gap-12">
                <div className="w-full lg:w-3/4 flex flex-col gap-4 border py-6 lg:py-8 px-4 lg:px-16 rounded-3xl border-secondaryyellow/20 bg-white order-2 md:order-1">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold text-black">Contact information:</h2>
                    </div>
                    <div>
                        <form ref={form} className="grid grid-cols-2 gap-4">
                            <div className='relative inputBox'>
                                <input type="text" placeholder="Full name" required name="name" className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    Full name
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="text" placeholder="Email" required name="email" className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn   text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    Email
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="text" placeholder="Address" required name="address" className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    Address
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="text" placeholder="City" name="city" required className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    City
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="text" placeholder="Country" name="country" required className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    Country
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="text" placeholder="State" required name="state" className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    State
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="text" required placeholder="Zip Code" name="cp" className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500'>
                                    Zip Code
                                </span>
                            </div>
                            <div className='relative inputBox'>
                                <input type="tel" required placeholder="Phone" name="phone" className="w-full border rounded-md border-gray-400/70 px-4 py-3  placeholder:text-gray-500 focus:outline-blueIn focus:border-blueIn text-black" />
                                <span className='absolute left-0 px-4 py-3 text-gray-500 '>
                                    Phone
                                </span>
                            </div>
                        </form>
                    </div>
                    <div className="flex mt-4 z-0 border px-4 pt-6 lg:px-16 lg:py-8">
                        <p className='w-1/4 font-semibold'>Pagar con:</p>
                        <div className='w-3/4 mx-auto'>

                            <PayPalScriptProvider options={{ 'client-id': 'AYrVyRxmATzQHa5CFXIxDkpbNcE2F5MS_Nf5-_b3fpbS67HMM-YshABgT0IBDaYqI6W5_MQNriLnxpQB' }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: context.preOrder?.[index]?.totalPrice,
                                                    }
                                                }
                                            ]
                                        })
                                    }}
                                    paypalOptions={paypalOptions}
                                    buttonStyles={buttonStyles}
                                    amount={context.preOrder?.[index]?.totalPrice}
                                    onClick={() => {
                                        console.log(context.preOrder?.[index]?.totalPrice);
                                        console.log('Start Payment')
                                    }}
                                    onApprove={(data, actions) => onApprove(data, actions)}
                                    onError={error => console.log(error)}
                                    onCancele={data => console.log(data)}

                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-1/4 order-1 md:order-2'>
                    <h3 className="font-semibold text-lg border-b text-center">Pedido</h3>
                    <div className='flex flex-col mt-4'>
                        {context.preOrder?.[index]?.products.map((product) => (
                            <OrderCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                imageUrl={product.images[0]}
                                price={product.price}
                            />
                        ))}
                    </div>
                    <div className='flex border-t gap-2 my-2 pt-2'>
                        <p className='font-semibold'>Total a pagar: </p>
                        <span className='font-light'> ${context.preOrder?.[index]?.totalPrice}</span>
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export { MyInformation }