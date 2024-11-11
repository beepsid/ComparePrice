import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false); // Track if search has been made

    const searchProducts = async () => {
        setLoading(true);
        setSearched(true); // Mark as searched
        try {
            const response = await axios.get(`http://localhost:3000/search?productName=${productName}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
            alert('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <button onClick={searchProducts}>Search</button>

            {loading && <p>Loading...</p>}

            <div className="product-grid">
                {/* Only show "No products found" after a search and if no products were returned */}
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
};

export default ProductSearch;
