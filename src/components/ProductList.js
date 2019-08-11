import React from 'react';
import Product from './Product';

const formatNumber = (number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2}).format(number);
  const ProductList = ({products, addToCart, removeFromCart, deleteFromCart, available}) => (
    <div className="container">
        <div className="columns is-centered">
            <div className="column is-narrow">
                {products.map(prod=>
                <Product 
                    key = {prod.id}
                    title = {prod.title}
                    price = {formatNumber(prod.price)}
                    inventory = {available[prod.id]}
                    image = {prod.image}
                    addToCart = {() => addToCart(prod.id)}
                    removeFromCart = {() => removeFromCart(prod.id)}
                    deleteFromCart = {() => deleteFromCart(prod.id)}
                />
                )}   
            </div>
        </div>
    </div>
  );

  export default ProductList; 
