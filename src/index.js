import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
)

reportWebVitals();

// ReactDOM.render(
//   <BrowserRouter>
//     <ApolloProvider client={client} >
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </ApolloProvider>
//   </BrowserRouter>,

//   document.getElementById('root')
// );
