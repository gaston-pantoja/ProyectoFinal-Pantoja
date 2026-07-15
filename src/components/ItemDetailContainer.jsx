
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../config/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import ItemCount from './ItemCount'; 

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    
    const docRef = doc(db, "products", itemId);

    
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.error("El componente no existe en el catálogo.");
        }
      })
      .catch((error) => console.error("Error cargando especificaciones:", error))
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleOnAdd = (quantity) => {
    
    alert(`Agregadas ${quantity} unidades de ${product.name} a la orden de producción.`);
  };

  if (loading) {
    return (
      <div className="container text-center my-5 text-success">
        <h3 className="font-monospace">Extrayendo especificaciones de hardware en la nube...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center my-5 text-white">
        <h3>Componente no registrado.</h3>
      </div>
    );
  }

  return (
    <div className="container my-5 text-white">
      <div className="row bg-dark p-5 rounded border border-secondary">
        <div className="col-md-6">
          <img 
            src={product.img} 
            alt={product.name} 
            className="img-fluid rounded" 
            style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <span className="badge bg-success mb-2 text-uppercase">{product.category}</span>
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <p className="lead text-white-50">{product.description}</p>
            <h3 className="text-success fw-bold my-4">Valor: ${product.price} USD</h3>
          </div>
          
          
          <ItemCount stock={product.stock} onAdd={handleOnAdd} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;