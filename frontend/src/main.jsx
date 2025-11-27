import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './Contex/ShopContext.jsx'
import { LoadingProvider } from './Contex/LoadingContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
    <ShopContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopContextProvider>
    </LoadingProvider>
  </StrictMode>
);
