import { type HealthcareOrganization } from '$/store';
import { type UiSchema } from '@minvws/mgo-fhir-data';
import { useMemo, type HTMLAttributes } from 'react';
import { Stack } from '../../../../../packages/mgo-ui/src/components/Stack/Stack';
import { UiSchemaContext, type UiSchemaContextState } from './UiSchemaContext';
import { UiSchemaGroup } from './UiSchemaGroup';
import { type DataServiceId } from '@minvws/mgo-fhir-client';

export interface UiSchemaDisplayProps extends HTMLAttributes<HTMLDivElement> {
    readonly organizationId: HealthcareOrganization['id'];
    readonly dataServiceId: DataServiceId;
    readonly uiSchema: UiSchema;
}

export function UiSchemaDisplay({
    uiSchema: { children },
    organizationId,
    dataServiceId,
    ...rest
}: UiSchemaDisplayProps) {
    const contextValue = useMemo<UiSchemaContextState>(
        () => ({
            organizationId,
            dataServiceId,
        }),
        [organizationId, dataServiceId]
    );

    return (
        <Stack className="gap-6" {...rest}>
            <UiSchemaContext.Provider value={contextValue}>
                {children.map((group, index) => (
                    <UiSchemaGroup group={group} key={index} /> // eslint-disable-line react/no-array-index-key
                ))}
            </UiSchemaContext.Provider>
        </Stack>
    );
}
