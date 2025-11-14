import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type SingleValue as SingleValueData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
import { expect, test } from 'vitest';
import { SingleValue } from './SingleValue';

test('shows the value', () => {
    const value = {
        label: uniqueId(faker.lorem.word()),
        value: { display: faker.lorem.word() },
        type: 'SINGLE_VALUE',
    } satisfies SingleValueData;

    setupWithAppProviders(<SingleValue value={value} />);

    const definition = screen.getByRole('definition', { name: value.label });
    expect(definition).toHaveTextContent(value.value?.display);
});

test('renders nothing when value is undefined', () => {
    const value = {
        label: uniqueId(faker.lorem.word()),
        value: undefined,
        type: 'SINGLE_VALUE',
    } satisfies SingleValueData;

    setupWithAppProviders(<SingleValue value={value} />);

    const definition = screen.getByRole('definition', { name: value.label });
    expect(definition).toHaveTextContent('');
});
