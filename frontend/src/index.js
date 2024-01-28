import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NewAddProduct from './Component/NewAddProduct'
import ProductTable from './Component/ProductList';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <NewAddProduct />
    <ProductTable />
  </React.StrictMode>
);


reportWebVitals();