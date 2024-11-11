import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'; // Import axios for HTTP requests

function App() {
    const [products, setProducts] = useState([]); // State for storing products
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/home');
                console.log("Fetched products:", response.data); // Log fetched data
                setProducts(response.data); // Update state with product data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="App">
            <header className="header">MyShop</header>

            <main>
                {loading && <p>Loading products...</p>}
                {error && <p>{error}</p>}

                <div className="product-grid">
                    {products.length > 0 ? (
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
                    ) : (
                        !loading && <p>No products available</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
