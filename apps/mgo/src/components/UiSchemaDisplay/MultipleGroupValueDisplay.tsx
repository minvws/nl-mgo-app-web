import { type MultipleGroupedValues, type MultipleValues } from '@minvws/mgo-fhir-data';
import { MultipleValueDisplay } from './MultipleValueDisplay';

export interface MultipleGroupValueDisplayProps {
    readonly value: MultipleGroupedValues;
}

export function MultipleGroupValueDisplay({ value }: MultipleGroupValueDisplayProps) {
    const multipleValues: MultipleValues[] = (value.display ?? [undefined]).map((display) => ({
        label: value.label,
        type: 'MULTIPLE_VALUES',
        display,
    }));

    return (
        <>
            {multipleValues.map((value, index) => (
                <MultipleValueDisplay
                    key={index} // eslint-disable-line react/no-array-index-key
                    value={value}
                />
            ))}
        </>
    );
}
