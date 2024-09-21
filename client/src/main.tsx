import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'  // vanilla bootstrap below  need to remove eventually
// import 'bootstrap/dist/css/bootstrap.min.css';  // react-bootstrap can be used for this project to help create responsive pages & styling
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
