import { setupWithAppProviders } from '$test/helpers';
import { type UiSchema } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UiSchemaDisplay } from './UiSchemaDisplay';
import { faker } from '$test/faker';
import { uniqueId } from 'lodash';

test('can handle empty schema', () => {
    const uiSchema: UiSchema = {
        label: faker.lorem.sentence(),
        children: [],
    };

    setupWithAppProviders(<UiSchemaDisplay uiSchema={uiSchema} data-testid="ui-schema" />);

    const schema = screen.getByTestId('ui-schema');
    expect(schema).toBeVisible();
});

test('shows all groups', () => {
    const group1 = faker.lorem.sentence();
    const group2 = faker.lorem.sentence();

    const uiSchema: UiSchema = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: group1,
                children: [],
            },
            {
                label: group2,
                children: [],
            },
        ],
    };

    setupWithAppProviders(<UiSchemaDisplay uiSchema={uiSchema} />);

    screen.getByRole('heading', {
        name: group1,
        level: 2,
    });
    screen.getByRole('heading', {
        name: group2,
        level: 2,
    });
});

test('shows all children of a group', () => {
    const group = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: uniqueId(faker.lorem.word()),
                display: faker.lorem.word(),
                type: faker.lorem.word(),
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: [faker.lorem.word()],
                type: faker.lorem.word(),
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: [[faker.lorem.word()], [faker.lorem.word()]],
                type: faker.lorem.word(),
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: faker.lorem.word(),
                type: faker.lorem.word(),
                reference: undefined,
            },
            {
                label: uniqueId(faker.lorem.word()),
                display: faker.lorem.word(),
                type: faker.lorem.word(),
                reference: faker.lorem.word(),
            },
        ],
    } satisfies UiSchema['children'][number];

    const uiSchema: UiSchema = {
        label: faker.lorem.sentence(),
        children: [group],
    };

    setupWithAppProviders(<UiSchemaDisplay uiSchema={uiSchema} />);

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
    screen.getByRole('definition', {
        name: group.children[4].label,
    });
});

test('shows all children of a group', () => {
    const uiSchema: UiSchema = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: faker.lorem.sentence(),
                children: [
                    {
                        label: uniqueId(faker.lorem.word()),
                        display: undefined,
                        type: faker.lorem.word(),
                    },
                ],
            },
        ],
    };

    setupWithAppProviders(<UiSchemaDisplay uiSchema={uiSchema} />);

    const definition = screen.getByRole('definition', {
        name: uiSchema.children[0].children[0].label,
    });

    expect(definition.textContent).toEqual('Niet bekend');
});
