/* c8 ignore start */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth/index.ts';
import { readConfig } from './config.ts';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...readConfig().oidc}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
