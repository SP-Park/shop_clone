// import { useQuery } from "@tanstack/react-query";
// import { getProducts } from "../apis/firebase";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";


export default function Products() {
    // const { isLoading, error, data: products } = useQuery(['products'], getProducts)
    const { productsQuery: { isLoading, error, data: products }} = useProducts()
    return (
        <>
            {isLoading && <p>Loading....</p>}
            {error && <p>{error}</p>}
            <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {products && products.map((it) => (
                    <ProductCard key={it.id} product={it} />
                ))}
            </ul>
        </>
    )
}