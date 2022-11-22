import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoContext from './Context/CryptoContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoContext>

    <App />
    </CryptoContext>
  </React.StrictMode>
);


reportWebVitals();
