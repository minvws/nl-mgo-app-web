import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth';
import { authConfig } from './config';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...authConfig}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
