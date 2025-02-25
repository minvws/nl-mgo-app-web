import { useNavFocusRef } from '$/hooks';
import { type Resource } from '$/store';
import { getDetails, getSummary } from '@minvws/mgo-fhir-data';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Stack } from '@minvws/mgo-mgo-ui/components/Stack/Stack.js';
import { useMemo } from 'react';
import { HealthUiGroup } from './HealthUiGroup';
import { HealthUiSchemaContext, type HealthUiSchemaContextState } from './HealthUiSchemaContext';

export interface HealthUiSchemaProps {
    readonly resource: Resource;
    readonly showDetails?: boolean;
}

export function HealthUiSchema({ showDetails, resource }: HealthUiSchemaProps) {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const contextValue = useMemo<HealthUiSchemaContextState>(() => ({ resource }), [resource]);

    const getSchema = showDetails ? getDetails : getSummary;
    const { label, children } = getSchema(resource.mgoResource);

    return (
        <>
            <Heading asChild size="lg" className="mb-4 md:mb-8">
                <h1 ref={navFocusRef}>{label}</h1>
            </Heading>

            <Stack className="gap-6">
                <HealthUiSchemaContext.Provider value={contextValue}>
                    {children.map((group) => (
                        <HealthUiGroup group={group} key={group.label} />
                    ))}
                </HealthUiSchemaContext.Provider>
            </Stack>
        </>
    );
}
