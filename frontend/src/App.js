import React, { useState, useEffect } from 'react';
import './App.css';
import ProductSearch from './ProductSearch';
import axios from 'axios';
import logo from './assets/pricepal.png';


function App() {
    const [productName, setProductName] = useState(''); // State for search input
    const [products, setProducts] = useState([]); // State for storing products
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [searched, setSearched] = useState(false); // Track if search has been made

    // Fetch products based on search query
    const searchProducts = async () => {
        setLoading(true);
        setSearched(true);
        try {
            const response = await axios.get(`http://localhost:3000/search?productName=${productName}`);
            setProducts(response.data);
            setError(null); 
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/home');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching initial products:', error);
                setError('Failed to load initial products');
            }
        };

        fetchInitialProducts();
    }, []);

    return (
        <div className="App">
            {/* Header Section */}
            <header className="header">
                <div className="header-logo">
                <img src={logo} alt="PricePal Logo" />
                </div>

                {/* Search bar */}
                <div className="header-search">
                    <input
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="header-search-input"
                    />
                    <button onClick={searchProducts} className="header-search-button">
                        Search
                    </button>
                </div>

                {/* Navigation options */}
                <div className="header-nav">
                    <span className="header-nav-item">Hello, Sign in</span>
                    <span className="header-nav-item">Cart</span>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <ProductSearch 
                    products={products} 
                    loading={loading} 
                    searched={searched} 
                    error={error} 
                    productName={productName} 
                    setProductName={setProductName}
                    searchProducts={searchProducts} // Pass searchProducts here
                />
            </main>
        </div>
    );
}

export default App;
