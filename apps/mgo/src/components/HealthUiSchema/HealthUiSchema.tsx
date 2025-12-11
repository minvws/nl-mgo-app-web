/* eslint-disable react/no-array-index-key */
import { useLocation } from '$/routing';
import { type Resource } from '$/store';
import { type HealthUiSchema as HealthUiSchemaData } from '@minvws/mgo-hcim';
import { Heading, Stack } from '@minvws/mgo-ui';
import { useMemo } from 'react';
import { HealthUiGroup } from './HealthUiGroup';
import { HealthUiSchemaContext, type HealthUiSchemaContextState } from './HealthUiSchemaContext';

export interface HealthUiSchemaProps {
    readonly resource: Resource;
    readonly schema: HealthUiSchemaData;
}

export function HealthUiSchema({ schema, resource }: HealthUiSchemaProps) {
    const location = useLocation();
    const contextValue = useMemo<HealthUiSchemaContextState>(() => ({ resource }), [resource]);

    return (
        <>
            <Heading as="h1" size="xl" className="mt-4" focusOnRender focusOnRenderKey={location}>
                {schema.label}
            </Heading>
            <Stack className="gap-6">
                <HealthUiSchemaContext.Provider value={contextValue}>
                    {schema.children.map((group, i) => (
                        <HealthUiGroup group={group} key={`${group.label}-${i}`} />
                    ))}
                </HealthUiSchemaContext.Provider>
            </Stack>
        </>
    );
}
