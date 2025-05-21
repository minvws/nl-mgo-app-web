import { type MultipleValues as MultipleValuesData } from '@minvws/mgo-fhir-data';
import { DescriptionCard } from '@minvws/mgo-mgo-ui';

export interface MultipleValueDisplayProps {
    readonly value: MultipleValuesData;
}

export function MultipleValuesDisplay({ values }: { readonly values: string[] | undefined }) {
    return <div>{values?.map((value) => [value, <br key={value} />]).flat()}</div>;
}

export function MultipleValues({ value }: MultipleValueDisplayProps) {
    return (
        <DescriptionCard
            term={value.label}
            details={<MultipleValuesDisplay values={value.display} />}
        />
    );
}
