import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './main.css'
import AppRouter from './routes/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
