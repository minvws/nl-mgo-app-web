import { uniqueId } from 'lodash';
import { useRef } from 'react';

export function useUniqueId(idPrefix: string): string;
export function useUniqueId(...idPrefixes: string[]): string[];
export function useUniqueId(...idPrefixes: string[]) {
    const id = useRef(uniqueId());
    if (idPrefixes.length === 1) {
        return `${idPrefixes[0]}-${id.current}`;
    }

    return idPrefixes.map((x, i) => `${x}-${id.current}-${i}`);
}
