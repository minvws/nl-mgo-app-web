/* eslint-disable react/no-array-index-key */
import { useNavFocusRef } from '$/hooks';
import { useOrganizationsStore, type Resource } from '$/store';
import { getDetails, getSummary } from '@minvws/mgo-fhir-data';
import { Heading, Stack } from '@minvws/mgo-ui';
import { useMemo } from 'react';
import { HealthUiGroup } from './HealthUiGroup';
import { HealthUiSchemaContext, type HealthUiSchemaContextState } from './HealthUiSchemaContext';

export interface HealthUiSchemaProps {
    readonly resource: Resource;
    readonly summary?: boolean;
}

export function HealthUiSchema({ summary, resource }: HealthUiSchemaProps) {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const contextValue = useMemo<HealthUiSchemaContextState>(() => ({ resource }), [resource]);

    const getOrganizationById = useOrganizationsStore((x) => x.getOrganizationById);
    const organization = getOrganizationById(resource.organizationId);

    const getSchema = summary ? getSummary : getDetails;
    const { label, children } = getSchema(resource.mgoResource, { organization });

    return (
        <>
            <Heading asChild size="lg" className="mb-4 md:mb-8">
                <h1 ref={navFocusRef}>{label}</h1>
            </Heading>

            <Stack className="gap-6">
                <HealthUiSchemaContext.Provider value={contextValue}>
                    {children.map((group, i) => (
                        <HealthUiGroup group={group} key={`${group.label}-${i}`} />
                    ))}
                </HealthUiSchemaContext.Provider>
            </Stack>
        </>
    );
}
