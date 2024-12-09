import React from 'react';

const AddToCart = ({ productId, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      console.log("Adding product with ID:", productId);
      onAddToCart(productId); // Trigger add to cart
    } else {
      console.warn('AddToCart handler not provided!');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-green"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
