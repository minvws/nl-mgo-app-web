import { type ReferenceValue as ReferenceValueData } from '@minvws/mgo-fhir-data';
import { DescriptionCard } from '@minvws/mgo-mgo-ui';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceValueData;
}

export function ReferenceValue({ value }: ReferenceValueDisplayProps) {
    return <DescriptionCard term={value.label} details={value.display} />;
}
