import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type MultipleGroupedValues as MultipleGroupedValuesData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
import { expect, test } from 'vitest';
import { MultipleGroupedValues } from './MultipleGroupedValues';

test('shows all values', () => {
    const value = {
        label: uniqueId(faker.lorem.word()),
        value: [[{ display: faker.lorem.word() }, { display: faker.lorem.word() }]],
        type: 'MULTIPLE_GROUPED_VALUES',
    } satisfies MultipleGroupedValuesData;

    setupWithAppProviders(<MultipleGroupedValues value={value} />);

    const definition = screen.getByRole('definition', {
        name: value.label,
    });
    expect(definition).toHaveTextContent(value.value?.[0][0].display);
    expect(definition).toHaveTextContent(value.value?.[0][1].display);
});
