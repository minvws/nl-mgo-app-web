import { type MultipleValues as MultipleValuesData } from '@minvws/mgo-hcim-ui';
import { DescriptionCard } from '@minvws/mgo-ui';
import { isNonNullish } from '@minvws/mgo-utils';

export interface MultipleValueDisplayProps {
    readonly value: MultipleValuesData;
}

export function MultipleValuesDisplay({ values }: { readonly values: string[] | undefined }) {
    return <div>{values?.map((value) => [value, <br key={value} />]).flat()}</div>;
}

export function MultipleValues({ value }: MultipleValueDisplayProps) {
    const displayValues = value.display
        ?.map((v) => (typeof v === 'string' ? v : v.display))
        .filter(isNonNullish);

    return (
        <DescriptionCard
            term={value.label}
            details={<MultipleValuesDisplay values={displayValues} />}
        />
    );
}
