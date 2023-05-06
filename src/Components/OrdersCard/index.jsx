import { ChevronRightIcon } from '@heroicons/react/24/solid'


function OrdersCard(props) {
    const { totalPrice, totalProducts } = props

    const dateOrder = () => {
        const date = new Date()

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        if (day < 10 && month < 10) {
            return `0${day}-0${month}-${year}`
        } else {
            return `${day}-${month}-${year}`
        }
    }

    return (
        <div className="flex justify-between items-center mb-2 border border-gray-300 rounded-lg w-80 p-4 hover:bg-gray-100">
            <div className='w-full flex justify-between items-center'>
                <p className='flex flex-col'>
                    <span className='font-normal text-md'>Articles: {totalProducts}</span>
                    <span className='font-normal text-md'>Total: ${totalPrice}</span>
                </p>
                <p className='flex items-center gap-3'>
                    <span className='font-semibold text-md'>{dateOrder()}</span>
                    <ChevronRightIcon
                        className='h-4 w-4 text-gray-700 hover:text-gray-500'
                    />
                </p>

            </div>

        </div>
    )
}

export { OrdersCard }