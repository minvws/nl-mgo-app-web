import { DescriptionCard } from '@minvws/mgo-mgo-ui';
import { type MultipleValue } from '@minvws/mgo-fhir-data';
import { useFhirLabel } from './useFhirLabel';
import { useUnknownLabel } from './useUnknownLabel';

export interface MultipleValueDisplayProps {
    readonly value: MultipleValue;
}

export function MultipleValueDisplay({ value }: MultipleValueDisplayProps) {
    return (
        <DescriptionCard
            term={useFhirLabel(value.label)}
            details={useUnknownLabel(value.display?.join(', '))}
        />
    );
}
