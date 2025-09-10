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
        display: faker.lorem.word(),
        type: 'SINGLE_VALUE',
    } satisfies SingleValueData;

    setupWithAppProviders(<SingleValue value={value} />);

    const definition = screen.getByRole('definition', { name: value.label });
    expect(definition).toHaveTextContent(value.display);
});

test('shows the value with display coding', () => {
    const value = {
        label: uniqueId(faker.lorem.word()),
        display: {
            display: faker.lorem.word(),
            code: faker.lorem.word(),
            system: faker.internet.url(),
        },
        type: 'SINGLE_VALUE',
    } satisfies SingleValueData;

    setupWithAppProviders(<SingleValue value={value} />);

    const definition = screen.getByRole('definition', { name: value.label });
    expect(definition).toHaveTextContent(value.display.display);
});
