import React, { useState, useEffect } from 'react';
import './SearchScreen.css';
import ProductSearch from './ProductSearch';

const SearchScreen = ({ products, loading, error, addToCart }) => {
    const [sortOption, setSortOption] = useState('');
    const [sortedProducts, setSortedProducts] = useState(products);

    useEffect(() => {
        console.log('Sort option:', sortOption);
        let sorted = [...products]; 
        if (sortOption === 'low-to-high') {
            sorted = sorted.sort((a, b) => parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', '')));
        } else if (sortOption === 'high-to-low') {
            sorted = sorted.sort((a, b) => parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', '')));
        } else if (sortOption === 'featured') {
            sorted = [...products];
        }
        setSortedProducts(sorted); 
    }, [sortOption, products]); 

    return (
        <div>
            <h1>Search Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Sorting options */}
            <div className="search-results-info">
                <div className="left-side">
                    <p>{`Found ${products.length} results`}</p>
                </div>
                <div className="right-side">
                    <div className="sort-by">
                        <label>Sort by: </label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)} 
                        >
                            <option value="featured">Featured</option>
                            <option value="low-to-high">Price: Low to High</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Display */}
            <ProductSearch
                products={sortedProducts} 
                loading={loading}
                searched={true}
                addToCart={addToCart} 
            />
        </div>
    );
};

export default SearchScreen;
