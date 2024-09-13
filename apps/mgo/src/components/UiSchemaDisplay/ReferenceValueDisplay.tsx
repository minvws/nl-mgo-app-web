import { type ReferenceValue } from '@minvws/mgo-fhir-data';
import { DescriptionCard } from '@minvws/mgo-mgo-ui';
import { useFhirLabel } from './useFhirLabel';
import { useUnknownLabel } from './useUnknownLabel';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceValue;
}

export function ReferenceValueDisplay({ value }: ReferenceValueDisplayProps) {
    return (
        <DescriptionCard
            term={useFhirLabel(value.label)}
            details={useUnknownLabel(value.display)}
        />
    );
}
