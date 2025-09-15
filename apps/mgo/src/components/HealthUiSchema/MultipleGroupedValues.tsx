import { type MultipleGroupedValues as MultipleGroupedValuesData } from '@minvws/mgo-hcim-ui';
import { DescriptionCard, Stack } from '@minvws/mgo-ui';
import { isNonNullish } from '@minvws/mgo-utils';
import { MultipleValuesDisplay } from './MultipleValues';

export interface MultipleGroupedValuesProps {
    readonly value: MultipleGroupedValuesData;
}

export function MultipleGroupedValues({ value }: MultipleGroupedValuesProps) {
    const groupedValues = value.display?.map((group) =>
        group
            .map((groupValue) => (typeof groupValue === 'string' ? groupValue : groupValue.display))
            .filter(isNonNullish)
    );

    return (
        <DescriptionCard
            term={value.label}
            details={
                <Stack className="gap-2">
                    {groupedValues?.map((values, index) => (
                        <MultipleValuesDisplay
                            values={values}
                            // ui schemas are static, so we can use the index as key
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                        />
                    ))}
                </Stack>
            }
        />
    );
}
