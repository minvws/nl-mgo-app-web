import { uniqueId } from 'lodash';
import { useRef } from 'react';

export function useUniqueId<T extends string[]>(...idPrefixes: T): T {
    const id = useRef(uniqueId());
    return idPrefixes.map((x, i) => `${x}-${id.current}-${i}`) as T;
}
