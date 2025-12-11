/* eslint-disable react/no-array-index-key */
import { type HealthUiGroup as HealthUiGroupData } from '@minvws/mgo-hcim-ui';
import { DescriptionList, Heading, useUniqueId } from '@minvws/mgo-ui';
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
                <Heading
                    id={uiGroupId}
                    as="h2"
                    size="md"
                    className="text-t-cat-rijkslint sm:mb-3 md:mt-12 md:mb-6"
                >
                    {label}
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
