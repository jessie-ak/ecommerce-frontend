import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { getAllCategories } from "../../api/getAllCategories";
import { Sidebar } from "../../components/Sidebar";


export const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [displayfilteredProducts, setDisplayFilteredProducts] = useState([]);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');

    // Load products and categories
    useEffect(() => {
        (async () => {
            const products = await getAllProducts();
            const categorys = await getAllCategories();
            const updCategorys = [{ id: '1a', name: 'All' }, ...categorys];
            setProducts(products);
            setCategories(updCategorys);
            setDisplayFilteredProducts(products); // Initialize with all products
        })();
    }, []);

    // Auto-apply category filter whenever category changes
    useEffect(() => {
        if (products.length === 0) return;
        
        const categoryFiltered = currentCategory === 'all'
            ? products
            : products.filter(product => 
                product.category.name.toLowerCase() === currentCategory.toLowerCase()
              );
        
        setDisplayFilteredProducts(categoryFiltered);
    }, [currentCategory, products]);

    const onCategoryClick = (category) => {

        setCurrentCategory(category.toLowerCase());
    };

    const onApplyPriceFilter = () => {
        const CurrCatProductLst= currentCategory === 'all'
            ? products
            : products.filter(product => 
                product.category.name.toLowerCase() === currentCategory.toLowerCase()
              );
        const priceFiltered = CurrCatProductLst.filter(product => {
            const meetsMin = minValue === null || product.price >= minValue;
            const meetsMax = maxValue === null || product.price <= maxValue;
            return meetsMin && meetsMax;
        });
        setDisplayFilteredProducts(priceFiltered);
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <Sidebar 
                    onMinChange={setMinValue} 
                    onMaxChange={setMaxValue} 
                    onApplyFilterClick={onApplyPriceFilter} 
                />
                <main className="pt-8">
                    <div className="flex flex-wrap  justify-center gap-4 mb-3">
                        {categories?.length > 0 && categories.map((category) => (
                            <div 
                                key={category.id}
                                onClick={() => onCategoryClick(category.name)}
                                className={`bg-slate-50 text-gray-900 border-2 rounded-md p-1 hover:cursor-pointer ${
                                    currentCategory === category.name.toLowerCase() 
                                        ? 'border-gray-900 opacity-100' 
                                        : 'border-gray-400 opacity-70'
                                }`}
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {displayfilteredProducts?.length > 0 ? (
                            displayfilteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="text-gray-500">No products match your filters</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};