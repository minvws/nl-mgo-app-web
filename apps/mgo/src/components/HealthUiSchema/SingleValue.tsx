import { type SingleValue as SingleValueData } from '@minvws/mgo-hcim-ui';
import { DescriptionCard } from '@minvws/mgo-ui';
import { DisplayValue } from './DisplayValue';

export interface SingleValueDisplayProps {
    readonly value: SingleValueData;
}

export function SingleValue({ value }: SingleValueDisplayProps) {
    return <DescriptionCard term={value.label} details={<DisplayValue value={value.value} />} />;
}
