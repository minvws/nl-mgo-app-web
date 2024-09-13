/* eslint-disable react/no-array-index-key */
import {
    isMultipleGroupValue,
    isMultipleValue,
    isReferenceValue,
    isSingleValue,
    type UiSchema,
} from '@minvws/mgo-fhir-data';
import { DescriptionList, Heading } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { MultipleGroupValueDisplay } from './MultipleGroupValueDisplay';
import { MultipleValueDisplay } from './MultipleValueDisplay';
import { ReferenceValueDisplay } from './ReferenceValueDisplay';
import { SingleValueDisplay } from './SingleValueDisplay';
import { useFhirLabel } from './useFhirLabel';

export interface UiSchemaGroupProps extends HTMLAttributes<HTMLDivElement> {
    readonly group: UiSchema['children'][number];
}

export function UiSchemaGroup({ group: { label, children }, ...rest }: UiSchemaGroupProps) {
    return (
        <div {...rest}>
            <Heading asChild size="sm" className="mb-2 sm:mb-3">
                <h2>{useFhirLabel(label)}</h2>
            </Heading>

            <DescriptionList>
                {children.map((value, index) => {
                    if (isSingleValue(value)) {
                        return <SingleValueDisplay key={`single-${index}`} value={value} />;
                    } else if (isReferenceValue(value)) {
                        return <ReferenceValueDisplay key={`reference-${index}`} value={value} />;
                    } else if (isMultipleValue(value)) {
                        return <MultipleValueDisplay key={`multiple-${index}`} value={value} />;
                    } else if (isMultipleGroupValue(value)) {
                        return (
                            <MultipleGroupValueDisplay
                                key={`multiple-group-${index}`}
                                value={value}
                            />
                        );
                    }
                })}
            </DescriptionList>
        </div>
    );
}
