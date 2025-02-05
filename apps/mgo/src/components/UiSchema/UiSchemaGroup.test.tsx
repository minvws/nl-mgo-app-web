import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type UiSchemaGroup as UiSchemaGroupType } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UiSchemaGroup } from './UiSchemaGroup';

test('can handle empty group', () => {
    const group: UiSchemaGroupType = {
        label: faker.lorem.sentence(),
        children: [],
    };

    setupWithAppProviders(<UiSchemaGroup group={group} data-testid="ui-schema" />);

    const schema = screen.getByTestId('ui-schema');
    expect(schema).toBeVisible();
});

test('shows the label and children', () => {
    const group: UiSchemaGroupType = {
        label: faker.lorem.sentence(),
        children: [
            {
                type: 'SINGLE_VALUE',
                label: faker.lorem.sentence(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    setupWithAppProviders(<UiSchemaGroup group={group} data-testid="ui-schema" />);

    screen.getByRole('heading', {
        level: 2,
        name: group.label,
    });

    screen.getByRole('definition', {
        name: group.children[0].label,
    });
});

test('does not render the label if it is undefined', () => {
    const group: UiSchemaGroupType = {
        label: undefined,
        children: [
            {
                type: 'SINGLE_VALUE',
                label: faker.lorem.sentence(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    setupWithAppProviders(<UiSchemaGroup group={group} data-testid="ui-schema" />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});
