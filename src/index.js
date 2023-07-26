import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserIdentifierContextProvider } from './context/UserIdentifier.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserIdentifierContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserIdentifierContextProvider>
  </React.StrictMode>
);


