import { PublicRoot } from './PublicRoot';
import { ProtectedRoot } from './ProtectedRoot';
import { Inloggen } from './Inloggen';
import { Intro } from './Intro';
import { Overzicht } from './Overzicht';
import { Playground } from './Playground';

export const routes = [
    {
        path: '/',
        element: <PublicRoot />,
        children: [
            {
                path: '/inloggen',
                element: <Inloggen />,
            },
            {
                path: '/intro',
                element: <Intro />,
            },
        ],
    },
    {
        element: <ProtectedRoot />,
        children: [
            {
                path: '/overzicht',
                element: <Overzicht />,
            },
        ],
    },
    {
        path: '/playground',
        element: <Playground />,
    },
];
