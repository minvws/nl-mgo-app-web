import { useNavFocusRef } from '$/hooks';
import { type Resource } from '$/store';
import { getSummaryUiSchema, getUiSchema } from '@minvws/mgo-fhir-data';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Stack } from '@minvws/mgo-mgo-ui/components/Stack/Stack.js';
import { useMemo } from 'react';
import { UiSchemaContext, type UiSchemaContextState } from './UiSchemaContext';
import { UiSchemaGroup } from './UiSchemaGroup';

export interface UiSchemaProps {
    readonly resource: Resource;
    readonly showDetails?: boolean;
}

export function UiSchema({ showDetails, resource }: UiSchemaProps) {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const contextValue = useMemo<UiSchemaContextState>(() => ({ resource }), [resource]);

    const getSchema = showDetails ? getUiSchema : getSummaryUiSchema;
    const { label, children } = getSchema(resource.mgoResource);

    return (
        <>
            <Heading asChild size="lg" className="mb-4 md:mb-8">
                <h1 ref={navFocusRef}>{label}</h1>
            </Heading>

            <Stack className="gap-6">
                <UiSchemaContext.Provider value={contextValue}>
                    {children.map((group) => (
                        <UiSchemaGroup group={group} key={group.label} />
                    ))}
                </UiSchemaContext.Provider>
            </Stack>
        </>
    );
}
