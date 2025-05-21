import { useEffect } from 'react';

type Keys = 'Escape';

export interface KeyDownOptions {
    key: Keys;
    callback: () => void;
}

export function useKeyDown({ key, callback }: KeyDownOptions) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === key) {
                callback();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback, key]);
}
