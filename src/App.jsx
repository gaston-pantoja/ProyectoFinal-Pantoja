import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
   
    <div className="bg-dark min-vh-100 text-light">
      <BrowserRouter>
        
        <NavBar />
        
        
        <Routes>
          
          <Route 
            path="/" 
            element={<ItemListContainer greeting="Bienvenido a la vanguardia industrial e-commerce" />} 
          />
          
         
          <Route 
            path="/category/:categoryId" 
            element={<ItemListContainer greeting="Infraestructura Filtrada por Categoría" />} 
          />
          
         
          <Route 
            path="/item/:itemId" 
            element={<ItemDetailContainer />} 
          />
          
          
          <Route 
            path="*" 
            element={
              <div className="container my-5 text-center py-5">
                <h2 className="text-danger fw-bold mb-3">Error 404: Nodo No Encontrado</h2>
                <p className="text-white-50">La ruta solicitada no pertenece a nuestra infraestructura digital.</p>
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;