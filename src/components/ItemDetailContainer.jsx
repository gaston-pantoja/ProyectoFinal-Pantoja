import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/asyncMock';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    getProductById(itemId)
      .then(response => setProduct(response))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return <div className="container text-center my-5 text-success"><h3>Extrayendo especificaciones de hardware...</h3></div>;
  }

  if (!product) {
    return <div className="container text-center my-5 text-white"><h3>Componente no registrado.</h3></div>;
  }

  return (
    <div className="container my-5 text-white">
      <div className="row bg-dark p-5 rounded border border-secondary">
        <div className="col-md-6">
          <img src={product.img} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <span className="badge bg-success mb-2 text-uppercase">{product.category}</span>
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <p className="lead text-white-50">{product.description}</p>
            <h3 className="text-success fw-bold my-4">Valor: ${product.price} USD</h3>
          </div>
          
          <div className="bg-black p-3 rounded border border-secondary mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-outline-light btn-sm" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <span className="fs-5 fw-bold">{quantity} Unidades</span>
              <button className="btn btn-outline-light btn-sm" onClick={() => quantity < product.stock && setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn btn-success w-100 fw-bold" onClick={() => alert(`Agregadas ${quantity} unidades.`)}>
              Incorporar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;