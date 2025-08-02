import { Navbar } from "../../components/Navbar"
import { ProductDetails } from "../../components/ProductDetails.jsx"

export const ProductDescription=()=>{
    return(
        <>
        <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
        </div>
        <div className="flex flex-1 pt-20 overflow-hidden">
            <ProductDetails />
        </div>
        
        </div>
        </>
    )
}