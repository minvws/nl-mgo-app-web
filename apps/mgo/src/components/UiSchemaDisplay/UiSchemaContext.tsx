import { type HealthcareOrganization } from '$/store';
import { type DataServiceId } from '@minvws/mgo-fhir-client';
import { createContext } from 'react';

export interface UiSchemaContextState {
    organizationId: HealthcareOrganization['id'] | undefined;
    dataServiceId: DataServiceId | undefined;
}

export const UiSchemaContext = createContext<UiSchemaContextState>({
    organizationId: undefined,
    dataServiceId: undefined,
});
