
import React, { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-black p-3 rounded border border-secondary mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-light btn-sm" onClick={decrement}>-</button>
        <span className="fs-5 fw-bold">{quantity} Unidades</span>
        <button className="btn btn-outline-light btn-sm" onClick={increment}>+</button>
      </div>
      <button 
        className="btn btn-success w-100 fw-bold" 
        onClick={() => onAdd(quantity)}
        disabled={stock <= 0}
      >
        {stock > 0 ? "Incorporar al Carrito" : "Sin Stock de Producción"}
      </button>
    </div>
  );
};

export default ItemCount;