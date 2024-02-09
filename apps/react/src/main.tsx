/* c8 ignore start */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { routes } from './routes';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes);
root.render(
    <StrictMode>
        <App router={router} />
    </StrictMode>
);
