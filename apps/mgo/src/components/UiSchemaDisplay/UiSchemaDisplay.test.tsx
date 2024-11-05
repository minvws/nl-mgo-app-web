import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type UiSchema } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UiSchemaDisplay } from './UiSchemaDisplay';

test('can handle empty schema', () => {
    const uiSchema: UiSchema = {
        label: faker.lorem.sentence(),
        children: [],
    };

    setupWithAppProviders(
        <UiSchemaDisplay
            uiSchema={uiSchema}
            organizationId={faker.string.uuid()}
            dataServiceId={faker.custom.dataServiceId()}
            data-testid="ui-schema"
        />
    );

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

    setupWithAppProviders(
        <UiSchemaDisplay
            uiSchema={uiSchema}
            organizationId={faker.string.uuid()}
            dataServiceId={faker.custom.dataServiceId()}
        />
    );

    screen.getByRole('heading', {
        name: group1,
        level: 2,
    });
    screen.getByRole('heading', {
        name: group2,
        level: 2,
    });
});
