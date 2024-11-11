// src/ProductSearch.js
import React from 'react';
import './ProductSearch.css';

const ProductSearch = ({ products, loading, searched, error }) => (
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="product-grid">
            {searched && !loading && products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <div className="product-info">
                            <h3>{product.title}</h3>
                            <p className="price">{product.price}</p>
                        </div>
                        <div className="product-actions">
                            <a href={product.link} target="_blank" rel="noopener noreferrer" className="view-product-button">
                                View Product
                            </a>
                            <p className="source">Source: {product.source}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default ProductSearch;
