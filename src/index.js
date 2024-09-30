import { Buffer } from 'buffer'; // Buffer polyfill at the top
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Now we define window.Buffer after the imports
window.Buffer = Buffer; // Globally define Buffer

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
