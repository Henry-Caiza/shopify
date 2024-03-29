
import { useContext } from "react"
import { Layout } from "../../Components/Layout"
import { Card } from "../../Components/Card"
import { ProductDetail } from "../../Components/ProductDetail"
import { ShoppingCartContext } from "../../Context";

const titlePage = () => {
    const currentPath = window.location.pathname
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
    if (index) {
        return index
    } else {
        return 'Home'
    }

}

function Home() {

    const context = useContext(ShoppingCartContext);
    const renderView = () => {

        if (context.filteredItems?.length > 0) {
            return (
                context.filteredItems?.map(item => (<Card key={item.id} data={item} />))
            )
        } else {
            return (
                <p>We don't have that :c</p>
            )
        }

    }

    return (
        <Layout>
            <div className='flex items-center justify-center w-80 relative mb-4'>
                <h1 className='text-xl font-semibold first-letter:uppercase '>
                    {titlePage()}
                </h1>
            </div>
            <input type="text" placeholder="Search a product" className="border border-gray-400 rounded-full w-11/12  md:w-96 px-4 py-2 mb-8 focus:outline-gray-400"
                onChange={(event) => context.setSearchByTitle(event.target.value)}
            />
            <div className="w-full">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-4 sm:px-8 md:px-12 lg:px-32 pb-20">
                    {renderView()}
                </div>
            </div>

            <ProductDetail />
        </Layout>
    )
}

export { Home }