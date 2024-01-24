import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth';
import { readConfig } from './config';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...readConfig().oidc}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
