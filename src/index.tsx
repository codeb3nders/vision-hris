import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StyledEngineProvider } from '@mui/material';
import App from './App';
import {store} from './store'
import {Provider} from 'react-redux'
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <StyledEngineProvider injectFirst>
//       <App />
//     </StyledEngineProvider>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
      <App />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
