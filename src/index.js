import React from 'react';
import { StateProvider } from './StateContext';

import App from './App';
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StateProvider>
    
    </StateProvider> */}
    <App />
  </React.StrictMode>
);

