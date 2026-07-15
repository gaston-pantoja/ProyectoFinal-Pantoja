import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, clearCart, removeItem, totalCost, totalQuantity } = useCart();

 
  if (totalQuantity === 0) {
    return (
      <div className="container my-5 text-center py-5">
        <h2 className="fw-bold text-white mb-3">La línea de montaje está vacía</h2>
        <p className="lead text-white-50 mb-4">
          No hay soluciones biotecnológicas ni sistemas automatizados seleccionados para distribución.
        </p>
        <Link to="/" className="btn btn-success fw-bold px-4 py-2" style={{ backgroundColor: '#00ff88', color: '#121212' }}>
          Explorar Infraestructura
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5 text-white">
      <h2 className="display-6 fw-bold mb-4" style={{ borderLeft: '5px solid #00ff88', paddingLeft: '15px' }}>
        Orden de Producción Solicitada
      </h2>

      <div className="row">
       
        <div className="col-lg-8">
          {cart.map((prod) => (
            <div 
              className="card mb-3 text-white border-secondary" 
              style={{ backgroundColor: '#1e1e1e' }} 
              key={prod.id}
            >
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  <img 
                    src={prod.img} 
                    alt={prod.name} 
                    className="img-fluid rounded-start" 
                    style={{ height: '120px', width: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title fw-bold mb-1">{prod.name}</h5>
                      <p className="card-text text-white-50 mb-1">Cantidad: {prod.quantity} unidades</p>
                      <p className="card-text fw-bold" style={{ color: '#00ff88' }}>
                        Subtotal: ${prod.price * prod.quantity} USD
                      </p>
                    </div>
                    
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeItem(prod.id)}
                      title="Remover componente"
                    >
                      ✕ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="col-lg-4">
          <div className="p-4 rounded border border-secondary" style={{ backgroundColor: '#1e1e1e' }}>
            <h4 className="fw-bold mb-3 text-white">Resumen de Inversión</h4>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between mb-2 fs-5">
              <span>Componentes:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="d-flex justify-content-between mb-4 fs-4 fw-bold">
              <span>Inversión Total:</span>
              <span style={{ color: '#00ff88' }}>${totalCost} USD</span>
            </div>
            
            <button 
              className="btn btn-danger w-100 fw-bold mb-3" 
              onClick={clearCart}
            >
              Vaciar Línea de Montaje
            </button>
            
            <Link 
              to="/checkout" 
              className="btn btn-success w-100 fw-bold py-2 text-dark"
              style={{ backgroundColor: '#00ff88', border: 'none' }}
            >
              Confirmar e Iniciar Despliegue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;