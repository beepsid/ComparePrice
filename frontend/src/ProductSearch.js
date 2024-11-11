//src/ProductSearch.js

import React from 'react';

const ProductSearch = ({ products, loading, searched, error, productName, setProductName, searchProducts }) => (
    <div>
        {/* Shared Search Bar Input */}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="product-grid">
            {searched && !loading && products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product, index) => (
                    <div key={index} className="product">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                            View Product
                        </a>
                        <p>Source: {product.source}</p>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default ProductSearch;
