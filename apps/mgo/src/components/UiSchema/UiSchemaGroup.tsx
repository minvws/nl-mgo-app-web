/* eslint-disable react/no-array-index-key */
import { type UiSchema } from '@minvws/mgo-fhir-data';
import { DescriptionList, Heading } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { UiElement } from './UiElement';

export interface UiSchemaGroupProps extends HTMLAttributes<HTMLDivElement> {
    readonly group: UiSchema['children'][number];
}

export function UiSchemaGroup({ group: { label, children }, ...rest }: UiSchemaGroupProps) {
    return (
        <div {...rest}>
            {label && (
                <Heading asChild size="sm" className="mb-2 sm:mb-3">
                    <h2>{label}</h2>
                </Heading>
            )}

            <DescriptionList>
                {children.map((value, index) => (
                    <UiElement key={`${value.type}-${index}`} element={value} />
                ))}
            </DescriptionList>
        </div>
    );
}
