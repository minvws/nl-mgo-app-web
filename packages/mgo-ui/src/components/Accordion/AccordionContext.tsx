import { createContext } from 'react';

export interface AccordionContextState {
    expanded: boolean;
    buttonId: string;
    panelId: string;
    toggle: () => void;
}

export const AccordionContext = createContext<AccordionContextState>({
    expanded: false,
    buttonId: '',
    panelId: '',
    /* c8 ignore next, default value is never used */
    toggle: () => {},
});
