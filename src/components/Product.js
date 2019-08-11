import React from 'react';

const Product = ({title, price, inventory, image, addToCart, removeFromCart, deleteFromCart}) =>
(
    <div>
      <p><strong>{title} (${price})</strong></p> 
        <div className="field is-grouped">

       <p className="control">
            <a className="tag is-warning is-medium">
                 <span className="icon">
                    {inventory}
                  </span>
            </a>
          </p>

          <p className="control">
            <a className="button is-dark" onClick={addToCart}>
                 <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
            </a>
          </p>
          <p className="control">
            <a className="button is-dark"  onClick={removeFromCart}>
                  <span className="icon">
                    <i className="fas fa-minus"></i>
                  </span>
            </a>
          </p>
          <p className="control">
            <a className="button is-danger" onClick={deleteFromCart}>
                  <span className="icon">
                    <i className="fas fa-trash"></i>
                  </span>
            </a>
          </p>
          <img src={image} width="320px" height="180px"/>
        </div>
    </div>

)

export default Product;