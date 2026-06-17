import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../data/asyncMock'; 

const ItemListContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    
    
    const asyncFunction = categoryId ? getProductsByCategory : getProducts;

    asyncFunction(categoryId)
      .then(response => setProducts(response))
      .catch(error => console.error("Error al sincronizar catálogo:", error))
      .finally(() => setLoading(false));
  }, [categoryId]); 

 
  if (loading) {
    return (
      <div className="container text-center my-5 py-5 text-success">
        <div className="spinner-border mb-3" role="status" style={{ color: '#00ff88' }}></div>
        <h3>Sincronizando infraestructura con la red...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      
      
      <div className="p-5 rounded mb-5" style={{ backgroundColor: '#1e1e1e', borderLeft: '5px solid #00ff88' }}>
        <h1 className="display-5 fw-bold text-white mb-3">
          {props.greeting}
        </h1>
        <p className="lead text-white-50">
          Nuestra infraestructura digital está lista. Próximamente se desplegará aquí el catálogo completo de soluciones biotecnológicas y sistemas automatizados de alta eficiencia.
        </p>
        {categoryId && (
          <span className="badge text-uppercase p-2" style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ff88', color: '#00ff88' }}>
            Sector: {categoryId}
          </span>
        )}
      </div>

      
      <div className="row">
        {products.map(prod => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card text-white border-secondary h-100" style={{ backgroundColor: '#1e1e1e' }}>
              <img 
                src={prod.img} 
                className="card-img-top" 
                alt={prod.name} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold text-white mb-2">{prod.name}</h5>
                  <p className="card-text fw-bold fs-5" style={{ color: '#00ff88' }}>${prod.price} USD</p>
                </div>
                
                <Link to={`/item/${prod.id}`} className="btn btn-outline-success w-100 mt-3 fw-bold" style={{ borderColor: '#00ff88', color: '#00ff88' }}>
                  Ver Detalle Avanzado
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ItemListContainer;