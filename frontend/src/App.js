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
    const [sortOption, setSortOption] = useState(''); // State to track sorting option

    // Function to fetch products based on the search query
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

    // Sorting function
    const sortProducts = (option) => {
        setSortOption(option); 
        let sortedProducts;

        if (option === 'low-to-high') {
            sortedProducts = [...products].sort((a, b) => parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', '')));
        } else if (option === 'high-to-low') {
            sortedProducts = [...products].sort((a, b) => parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', '')));
        } else if (option === 'featured') {
            searchProducts();
            return;
        }

        setProducts(sortedProducts);
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
                <div className="header-logo" onClick={() => window.location.reload()}>
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
                {searched && (
                    <div className="search-results-info">
                        <div className="left-side">
                            <p>{`Found around ${products.length} results for "`}<span style={{ color: 'orange' }}>{productName}</span>"</p>
                        </div>

                        <div className="right-side">
                            {/* Sorting dropdown */}
                            <div className="sort-by">
                                <label>Sort by: </label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => sortProducts(e.target.value)}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="low-to-high">Price: Low to High</option>
                                    <option value="high-to-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                )}
                <ProductSearch
                    products={products}
                    loading={loading}
                    searched={searched}
                    error={error}
                    productName={productName}
                    setProductName={setProductName}
                    searchProducts={searchProducts} 
                />
            </main>
        </div>
    );
}

export default App;
