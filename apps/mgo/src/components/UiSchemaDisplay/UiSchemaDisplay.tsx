import { type UiSchema } from '@minvws/mgo-fhir-data';
import { Stack } from '../../../../../packages/mgo-ui/src/components/Stack/Stack';
import { UiSchemaGroup } from './UiSchemaGroup';
import { type HTMLAttributes } from 'react';

export interface UiSchemaDisplayProps extends HTMLAttributes<HTMLDivElement> {
    readonly uiSchema: UiSchema;
}

export function UiSchemaDisplay({ uiSchema: { children }, ...rest }: UiSchemaDisplayProps) {
    return (
        <Stack className="gap-6" {...rest}>
            {children.map((group, index) => (
                <UiSchemaGroup group={group} key={index} /> // eslint-disable-line react/no-array-index-key
            ))}
        </Stack>
    );
}
