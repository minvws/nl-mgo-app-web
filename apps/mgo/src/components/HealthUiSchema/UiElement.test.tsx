import { faker } from '$test/faker';
import { setup, setupWithAppProviders, supressConsoleError } from '$test/helpers';
import { type UiElement as UiElementData } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UiElement } from './UiElement';

test.each<UiElementData>([
    {
        type: 'SINGLE_VALUE',
        label: faker.lorem.sentence(),
        display: faker.lorem.word(),
    },
    {
        type: 'MULTIPLE_VALUES',
        label: faker.lorem.sentence(),
        display: [faker.lorem.word()],
    },
    {
        type: 'MULTIPLE_GROUPED_VALUES',
        label: faker.lorem.sentence(),
        display: [[faker.lorem.word()], [faker.lorem.word()]],
    },
    {
        label: faker.lorem.sentence(),
        type: 'REFERENCE_VALUE',
        display: faker.lorem.word(),
        reference: undefined,
    },
    {
        type: 'DOWNLOAD_LINK',
        label: faker.lorem.sentence(),
        url: faker.internet.url(),
    },
    {
        type: 'REFERENCE_LINK',
        label: faker.lorem.sentence(),
        reference: faker.lorem.word(),
    },
])('can render elements of type $type', (elementData) => {
    setupWithAppProviders(<UiElement element={elementData} />);

    switch (elementData.type) {
        case 'REFERENCE_LINK':
            screen.getByText(elementData.label);
            break;
        case 'DOWNLOAD_LINK':
            screen.getByRole('link', { name: elementData.label });
            break;
        default:
            screen.getByRole('definition', { name: elementData.label });
    }
});

test('throws if a type is not valid', async () => {
    const element = {
        type: 'INVALID_TYPE',
        label: faker.lorem.sentence(),
        display: faker.lorem.word(),
    } as unknown as UiElementData;

    supressConsoleError(() => {
        expect(() => setup(<UiElement element={element} />)).toThrow(
            `Unknown UiElement type: ${element.type}`
        );
    });
});
