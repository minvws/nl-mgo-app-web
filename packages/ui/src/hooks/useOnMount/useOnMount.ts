import { useEffect, useRef, type EffectCallback } from 'react';

export function useOnMount(effect: EffectCallback) {
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
