import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type MultipleGroupedValues } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
import { expect, test } from 'vitest';
import { MultipleGroupValueDisplay } from './MultipleGroupValueDisplay';

test('shows all values', () => {
    const value: MultipleGroupedValues = {
        label: uniqueId(faker.lorem.word()),
        display: [[faker.lorem.word()], [faker.lorem.word()]],
        type: 'MULTIPLE_GROUPED_VALUES',
    };

    setupWithAppProviders(<MultipleGroupValueDisplay value={value} />);

    const groupDefinitions = screen.getAllByRole('definition', {
        name: value.label,
    });
    expect(groupDefinitions).toHaveLength(2);
});

test('still renders when display is undefined', () => {
    const value: MultipleGroupedValues = {
        label: uniqueId(faker.lorem.word()),
        display: undefined,
        type: 'MULTIPLE_GROUPED_VALUES',
    };

    setupWithAppProviders(<MultipleGroupValueDisplay value={value} />);

    const groupDefinitions = screen.getAllByRole('definition', {
        name: value.label,
    });
    expect(groupDefinitions).toHaveLength(1);
});
