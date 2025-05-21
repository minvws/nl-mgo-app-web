/* eslint-disable react/no-array-index-key */
import { type HealthUiGroup as HealthUiGroupData } from '@minvws/mgo-fhir-data';
import { DescriptionList, Heading, useUniqueId } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { UiElement } from './UiElement';

export interface HealthUiGroupProps extends HTMLAttributes<HTMLDivElement> {
    readonly group: HealthUiGroupData;
}

export function HealthUiGroup({ group: { label, children }, ...rest }: HealthUiGroupProps) {
    const uiGroupId = useUniqueId('health-ui-group');
    const hasLabel = !!label;
    return (
        <div {...rest}>
            {hasLabel && (
                <Heading id={uiGroupId} asChild size="sm" className="mb-2 sm:mb-3">
                    <h2>{label}</h2>
                </Heading>
            )}

            <DescriptionList aria-labelledby={hasLabel ? uiGroupId : undefined}>
                {children.map((value, index) => (
                    <UiElement key={`${value.type}-${index}`} element={value} />
                ))}
            </DescriptionList>
        </div>
    );
}
