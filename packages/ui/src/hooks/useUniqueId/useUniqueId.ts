import { useId } from 'react';

export function useUniqueId(idPrefix: string): string;
export function useUniqueId(...idPrefixes: string[]): string[];
export function useUniqueId(...idPrefixes: string[]) {
    const base = useId();
    if (idPrefixes.length === 1) {
        return `${idPrefixes[0]}-${base}`;
    }
    return idPrefixes.map((x, i) => `${x}-${base}-${i}`);
}
