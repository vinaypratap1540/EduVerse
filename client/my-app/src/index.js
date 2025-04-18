import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Provider } from 'react-redux';
import { appStore } from './app/store.js';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
       <App />
       <ToastContainer
           position="bottom-right"
           autoClose={3000}
           hideProgressBar={true}
           newestOnTop={true}
           closeOnClick
           pauseOnHover
           draggable
     />
    </Provider>
  </React.StrictMode>
);

