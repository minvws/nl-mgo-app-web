import { createContext } from 'react';
import { type Gap } from './gap';

export interface DetailListContextState {
    gap: Gap;
}

export const DetailListContext = createContext<DetailListContextState>({
    gap: 'normal',
});
