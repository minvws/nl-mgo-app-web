/* eslint-disable react/no-array-index-key */
import { type HealthUiGroup as HealthUiGroupData } from '@minvws/mgo-fhir-data';
import { DescriptionList, Heading } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { UiElement } from './UiElement';

export interface HealthUiGroupProps extends HTMLAttributes<HTMLDivElement> {
    readonly group: HealthUiGroupData;
}

export function HealthUiGroup({ group: { label, children }, ...rest }: HealthUiGroupProps) {
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
