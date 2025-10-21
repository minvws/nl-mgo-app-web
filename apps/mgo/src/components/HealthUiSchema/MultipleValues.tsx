import {
    DisplayValue as DisplayValueData,
    type MultipleValues as MultipleValuesData,
} from '@minvws/mgo-hcim-ui';
import { DescriptionCard } from '@minvws/mgo-ui';
import { DisplayValue } from './DisplayValue';

export interface MultipleValueDisplayProps {
    readonly value: MultipleValuesData;
}

export function MultipleValuesDisplay({
    values,
}: {
    readonly values?: readonly DisplayValueData[];
}) {
    if (!Array.isArray(values)) return null;

    return (
        <>
            {values.map((value, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <DisplayValue key={index} value={value} />
            ))}
        </>
    );
}

export function MultipleValues({ value }: MultipleValueDisplayProps) {
    return (
        <DescriptionCard
            term={value.label}
            details={<MultipleValuesDisplay values={value.value} />}
        />
    );
}
