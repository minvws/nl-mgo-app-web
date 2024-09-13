import { type MultipleGroupValue, type MultipleValue } from '@minvws/mgo-fhir-data';
import { MultipleValueDisplay } from './MultipleValueDisplay';

export interface MultipleGroupValueDisplayProps {
    readonly value: MultipleGroupValue;
}

export function MultipleGroupValueDisplay({ value }: MultipleGroupValueDisplayProps) {
    const multipleValues: MultipleValue[] = (value.display ?? [undefined]).map((display) => ({
        label: value.label,
        type: value.type,
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
