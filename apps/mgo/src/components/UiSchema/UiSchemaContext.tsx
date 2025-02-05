import { type Resource } from '$/store';
import { createContext } from 'react';

export interface UiSchemaContextState {
    resource: Resource | undefined;
}

export const UiSchemaContext = createContext<UiSchemaContextState>({
    resource: undefined,
});
