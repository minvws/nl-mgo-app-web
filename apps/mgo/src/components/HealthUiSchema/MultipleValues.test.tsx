import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type MultipleValues as MultipleValuesData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
import { expect, test } from 'vitest';
import { MultipleValues } from './MultipleValues';

test('shows the value', () => {
    const value = {
        label: uniqueId(faker.lorem.word()),
        value: [{ display: faker.lorem.word() }, { display: faker.lorem.word() }],
        type: 'MULTIPLE_VALUES',
    } satisfies MultipleValuesData;

    setupWithAppProviders(<MultipleValues value={value} />);

    const definition = screen.getByRole('definition', { name: value.label });
    expect(definition).toHaveTextContent(value.value?.[0].display);
    expect(definition).toHaveTextContent(value.value?.[1].display);
});
