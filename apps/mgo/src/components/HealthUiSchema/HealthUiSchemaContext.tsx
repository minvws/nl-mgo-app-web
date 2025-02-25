import { type Resource } from '$/store';
import { createContext } from 'react';

export interface HealthUiSchemaContextState {
    resource: Resource | undefined;
}

export const HealthUiSchemaContext = createContext<HealthUiSchemaContextState>({
    resource: undefined,
});
