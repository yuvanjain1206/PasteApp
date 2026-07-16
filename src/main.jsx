import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#161B22',
            color: '#F0F6FC',
            border: '1px solid #30363D',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#161B22',
            },
          },
          error: {
            iconTheme: {
              primary: '#F87171',
              secondary: '#161B22',
            },
          },
        }}
      />
    </Provider>

  </StrictMode>,
)
