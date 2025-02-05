import { type MultipleGroupedValues as MultipleGroupedValuesData } from '@minvws/mgo-fhir-data';
import { DescriptionCard, Stack } from '@minvws/mgo-mgo-ui';
import { MultipleValuesDisplay } from './MultipleValues';

export interface MultipleGroupedValuesProps {
    readonly value: MultipleGroupedValuesData;
}

export function MultipleGroupedValues({ value }: MultipleGroupedValuesProps) {
    return (
        <DescriptionCard
            term={value.label}
            details={
                <Stack className="gap-2">
                    {value.display?.map((values) => (
                        <MultipleValuesDisplay values={values} key={values.join()} />
                    ))}
                </Stack>
            }
        />
    );
}
