import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* here give Context API provider component in chield component of App */}
    <StateProvider initialState={initialState} reducer={reducer} >
      <App />
    </StateProvider>

  </React.StrictMode>
);