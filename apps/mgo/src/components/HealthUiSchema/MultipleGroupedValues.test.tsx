import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type MultipleGroupedValues as MultipleGroupedValuesData } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
import { expect, test } from 'vitest';
import { MultipleGroupedValues } from './MultipleGroupedValues';

test('shows all values', () => {
    const value: MultipleGroupedValuesData = {
        label: uniqueId(faker.lorem.word()),
        display: [[faker.lorem.word()], [faker.lorem.word()]],
        type: 'MULTIPLE_GROUPED_VALUES',
    };

    setupWithAppProviders(<MultipleGroupedValues value={value} />);

    const definition = screen.getByRole('definition', {
        name: value.label,
    });
    expect(definition).toHaveTextContent(value.display![0][0]);
    expect(definition).toHaveTextContent(value.display![1][0]);
});
