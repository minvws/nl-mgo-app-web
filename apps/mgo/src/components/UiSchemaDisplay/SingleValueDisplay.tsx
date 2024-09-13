import { type SingleValue } from '@minvws/mgo-fhir-data';
import { DescriptionCard } from '@minvws/mgo-mgo-ui';
import { useFhirLabel } from './useFhirLabel';
import { useUnknownLabel } from './useUnknownLabel';

export interface SingleValueDisplayProps {
    readonly value: SingleValue;
}

export function SingleValueDisplay({ value }: SingleValueDisplayProps) {
    return (
        <DescriptionCard
            term={useFhirLabel(value.label)}
            details={useUnknownLabel(value.display)}
        />
    );
}
