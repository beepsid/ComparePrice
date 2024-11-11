// src/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
    if (!products.length) return <p>No products found.</p>;

    return (
        <div id="result">
            {products.map((product, index) => (
                <div key={index} className="product">
                    <img src={product.imageUrl} alt={product.title} />
                    <div>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                            {product.title}
                        </a>
                        <p>{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
