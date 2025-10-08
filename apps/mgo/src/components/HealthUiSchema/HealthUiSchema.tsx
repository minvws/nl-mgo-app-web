/* eslint-disable react/no-array-index-key */
import { useNavFocusRef } from '$/hooks';
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
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const contextValue = useMemo<HealthUiSchemaContextState>(() => ({ resource }), [resource]);

    return (
        <>
            <Heading asChild size="lg" className="mb-4 md:mb-8">
                <h1 ref={navFocusRef}>{schema.label}</h1>
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
