import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
  const { cart, totalCost, clearCart } = useCart();
  
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = (e) => {
    e.preventDefault();
    setError('');

    
    if (!name || !email || !confirmEmail || !phone) {
      setError('Por favor, complete todos los campos requeridos para el despacho.');
      return;
    }

    
    if (email !== confirmEmail) {
      setError('Las direcciones de correo electrónico no coinciden.');
      return;
    }

    setLoading(true);

    
    const order = {
      buyer: { name, email, phone },
      items: cart.map(prod => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: prod.quantity
      })),
      total: totalCost,
      date: serverTimestamp()
    };

   
    const ordersCollection = collection(db, 'orders');
    addDoc(ordersCollection, order)
      .then((docRef) => {
        setOrderId(docRef.id); 
        clearCart();           
      })
      .catch((err) => {
        console.error("Error al procesar la orden en Firestore:", err);
        setError('Ocurrió un error al procesar el envío en el servidor de base de datos.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  
  if (orderId) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="p-5 rounded border border-success bg-dark" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{ fontSize: '4rem' }}>🚀</span>
          <h2 className="fw-bold text-success mt-3 mb-3">¡Orden de Producción Iniciada!</h2>
          <p className="lead text-white-50 mb-4">
            Su solicitud de infraestructura ha sido registrada con éxito en nuestros servidores de distribución.
          </p>
          <div className="alert alert-secondary bg-dark border-secondary text-white p-3 font-monospace mb-4">
            <span className="text-success fw-bold d-block mb-1">CÓDIGO ÚNICO DE SEGUIMIENTO</span>
            {orderId}
          </div>
          <Link to="/" className="btn btn-success fw-bold px-4 py-2" style={{ backgroundColor: '#00ff88', color: '#121212', border: 'none' }}>
            Volver al Catálogo Principal
          </Link>
        </div>
      </div>
    );
  }

  
  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center py-5">
        <h2 className="text-white fw-bold mb-3">No hay órdenes pendientes</h2>
        <p className="text-white-50 mb-4">La línea de montaje se encuentra inactiva o vacía en este momento.</p>
        <Link to="/" className="btn btn-success fw-bold px-4 py-2" style={{ backgroundColor: '#00ff88', color: '#121212', border: 'none' }}>
          Explorar Soluciones de Hardware
        </Link>
      </div>
    );
  }

  
  return (
    <div className="container my-5 text-white" style={{ maxWidth: '600px' }}>
      <h2 className="display-6 fw-bold mb-4" style={{ borderLeft: '5px solid #00ff88', paddingLeft: '15px' }}>
        Finalizar Compra
      </h2>
      
      <div className="p-4 rounded border border-secondary" style={{ backgroundColor: '#1e1e1e' }}>
        <p className="text-white-50 mb-4">
          Complete los datos de la terminal receptora para iniciar el despacho oficial del equipamiento tecnológico.
        </p>

        {error && <div className="alert alert-danger font-monospace py-2">{error}</div>}

        <form onSubmit={handleCheckout}>
          <div className="mb-3">
            <label className="form-label text-white-50">Nombre Completo del Receptor</label>
            <input 
              type="text" 
              className="form-control bg-dark text-white border-secondary" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white-50">Teléfono de Contacto</label>
            <input 
              type="tel" 
              className="form-control bg-dark text-white border-secondary" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white-50">Correo Electrónico Oficial</label>
            <input 
              type="email" 
              className="form-control bg-dark text-white border-secondary" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-white-50">Confirmar Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control bg-dark text-white border-secondary" 
              value={confirmEmail} 
              onChange={(e) => setConfirmEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="border-top border-secondary pt-3 mb-4">
            <div className="d-flex justify-content-between align-items-center fs-4">
              <span>Monto Final a Transferir:</span>
              <span style={{ color: '#00ff88' }} className="fw-bold">${totalCost} USD</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-success w-100 fw-bold py-2 text-dark" 
            style={{ backgroundColor: '#00ff88', border: 'none' }}
            disabled={loading}
          >
            {loading ? 'Sincronizando con Servidor Cloud...' : 'AUTORIZAR Y GENERAR COMPRA'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;