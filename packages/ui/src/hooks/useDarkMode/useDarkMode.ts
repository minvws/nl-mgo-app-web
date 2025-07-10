import { useState } from 'react';

export function useDarkMode() {
    const query =
        typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(query ? query.matches : false);

    if (query) {
        query.addEventListener('change', (event) => {
            setDarkMode(event.matches);
        });
    }

    return darkMode;
}
