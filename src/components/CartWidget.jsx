import React from 'react';
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 

const CartWidget = () => {
  
  const { totalQuantity } = useCart();

  return (
    
    <Link to="/cart" className="d-flex align-items-center position-relative text-decoration-none" style={{ cursor: 'pointer' }}>
      
      <span style={{ fontSize: '1.6rem' }}>🛒</span>

      
      {totalQuantity > 0 && (
        <span 
          className="badge rounded-pill position-absolute top-0 start-100 translate-middle text-dark fw-bold"
          style={{ backgroundColor: '#00ff88' }} 
        >
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;