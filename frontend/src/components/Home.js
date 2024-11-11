// src/components/Home.js
import React from 'react';
import ProductSearch from './ProductSearch';

const Home = ({ products, loading }) => {
    return (
        <div>
            <h1>Welcome to PricePal</h1>
            <p>Featured Products:</p>
            <ProductSearch
                products={products}
                loading={loading}
                searched={false}
            />
        </div>
    );
};

export default Home;
