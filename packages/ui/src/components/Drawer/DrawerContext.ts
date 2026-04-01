import { createContext, useContext } from 'react';

interface DrawerContextState {
    readonly open: boolean;
}

export const DrawerContext = createContext<DrawerContextState>({ open: false });

export const useDrawerOpen = () => useContext(DrawerContext).open;
