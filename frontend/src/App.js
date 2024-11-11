import React, { useState, useEffect } from 'react';
import './App.css';
import ProductSearch from './components/ProductSearch';
import axios from 'axios';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import logo from './assets/pricepal.png';
import CartPage from './components/CartPage';
import SearchScreen from './components/SearchScreen'; 

function App() {
    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();  //current route location

    const searchProducts = async () => {
        setLoading(true);
        setSearched(true);
        try {
            const response = await axios.get(`http://localhost:3000/search?productName=${productName}`);
            setProducts(response.data);
            setError(null);
            navigate('/search'); 
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCartItems(prevCart => [...prevCart, product]);
    };

    const removeFromCart = (product) => {
        setCartItems(cartItems.filter(item => item !== product));
    };

    const viewProductSource = (product) => {
        alert(`Viewing product source for ${product.name}`);
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
            {/* Header for both pages */}
            <header className="header">
                <div className="header-logo" onClick={() => navigate('/')}> {/* Added onClick handler */}
                    <img src={logo} alt="PricePal Logo" />
                </div>
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
                <div className="header-nav">
                    <span className="header-nav-item">Hello, Sign in</span>
                    <Link to="/cart" className="header-nav-item">Cart ({cartItems.length})</Link>
                </div>
            </header>

            <main>
                <Routes>
                    {/* Home page route */}
                    <Route path="/" element={
                        location.pathname === '/' && (
                            <>
                                {/* Show the home screen items only on the home page */}
                                <div className="home-items">
                                    <h2>Home Page Products</h2>
                                    <ProductSearch
                                        products={products}
                                        loading={loading}
                                        searched={searched}
                                        error={error}
                                        addToCart={addToCart}
                                    />
                                </div>
                            </>
                        )
                    } />

                    {/* Search page route: Use SearchScreen for sorting and displaying results */}
                    <Route path="/search" element={
                        <SearchScreen
                            products={products}
                            loading={loading}
                            error={error}
                            addToCart={addToCart}
                        />
                    } />

                    {/* Cart page route */}
                    <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} viewProductSource={viewProductSource} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
