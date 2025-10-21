import { type MultipleGroupedValues as MultipleGroupedValuesData } from '@minvws/mgo-hcim-ui';
import { DescriptionCard, Stack } from '@minvws/mgo-ui';
import { MultipleValuesDisplay } from './MultipleValues';

export interface MultipleGroupedValuesProps {
    readonly value: MultipleGroupedValuesData;
}

export function MultipleGroupedValues({ value }: MultipleGroupedValuesProps) {
    return (
        <DescriptionCard
            term={value.label}
            details={
                <Stack className="items-start gap-2">
                    {value.value?.map((values, index) => (
                        <MultipleValuesDisplay
                            // ui schemas are static, so we can use the index as key
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            values={values}
                        />
                    ))}
                </Stack>
            }
        />
    );
}
