import { faker } from '$test/faker';
import { setupWithAppProviders, supressError } from '$test/helpers';
import { type UiSchemaGroup as UiSchemaGroupType } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
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

test('shows all children', () => {
    const group: UiSchemaGroupType = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: uniqueId(faker.lorem.word()),
                display: faker.lorem.word(),
                type: 'SINGLE_VALUE',
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: [faker.lorem.word()],
                type: 'MULTIPLE_VALUES',
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: [[faker.lorem.word()], [faker.lorem.word()]],
                type: 'MULTIPLE_GROUPED_VALUES',
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: faker.lorem.word(),
                reference: undefined,
                type: 'REFERENCE_VALUE',
            },
            {
                label: uniqueId(faker.lorem.word()),
                url: faker.internet.url(),
                type: 'DOWNLOAD_LINK',
            },
        ],
    };

    setupWithAppProviders(<UiSchemaGroup group={group} data-testid="ui-schema" />);

    screen.getByRole('definition', {
        name: group.children[0].label,
    });
    screen.getByRole('definition', {
        name: group.children[1].label,
    });
    const groupDefinitions = screen.getAllByRole('definition', {
        name: group.children[2].label,
    });
    expect(groupDefinitions).toHaveLength(2);

    screen.getByRole('definition', {
        name: group.children[3].label,
    });
    screen.getByRole('link', {
        name: group.children[4].label,
    });
});

test('shows all children of a group who do not have a display value', () => {
    const group: UiSchemaGroupType = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: uniqueId(faker.lorem.word()),
                display: undefined,
                type: 'SINGLE_VALUE',
            },
        ],
    };

    setupWithAppProviders(<UiSchemaGroup group={group} data-testid="ui-schema" />);

    const definition = screen.getByRole('definition', {
        name: group.children[0].label,
    });

    expect(definition.textContent).toEqual('Niet bekend');
});

test('throws if a type is not valid', () => {
    const group: UiSchemaGroupType = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: uniqueId(faker.lorem.word()),
                display: undefined,
                type: faker.lorem.word() as any, // eslint-disable-line @typescript-eslint/no-explicit-any
            },
        ],
    };

    supressError(() => {
        expect(() =>
            setupWithAppProviders(<UiSchemaGroup group={group} data-testid="ui-schema" />)
        ).toThrow(`Unknown UiEntry type: ${group.children[0].type}`);
    });
});
