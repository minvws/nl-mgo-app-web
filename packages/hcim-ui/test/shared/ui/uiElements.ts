import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import {
    DisplayValue,
    DownloadBinary,
    DownloadLink,
    MultipleGroupedValues,
    MultipleValues,
    ReferenceLink,
    ReferenceValue,
    SingleValue,
    UiElement,
} from '../../../src/types/schema.js';

export const displayValue = createMockFactory<DisplayValue>(() => {
    return {
        display: faker.lorem.sentence(),
        code: faker.lorem.word(),
        system: faker.internet.url(),
    };
});

export const singleValue = createMockFactory<SingleValue>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'SINGLE_VALUE',
        value: displayValue(),
    };
});

export const multipleValues = createMockFactory<MultipleValues>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'MULTIPLE_VALUES',
        value: mockArray({
            max: 4,
            factory: displayValue,
        }),
    };
});

export const multipleGroupedValues = createMockFactory<MultipleGroupedValues>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'MULTIPLE_GROUPED_VALUES',
        value: mockArray({
            max: 4,
            factory: () =>
                mockArray({
                    max: 4,
                    factory: displayValue,
                }),
        }),
    };
});

export const referenceValue = createMockFactory<ReferenceValue>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'REFERENCE_VALUE',
        display: faker.lorem.sentence(),
        reference: `${faker.lorem.word()}/${faker.number.int()}`,
    };
});

export const referenceLink = createMockFactory<ReferenceLink>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'REFERENCE_LINK',
        display: faker.lorem.sentence(),
        reference: `${faker.lorem.word()}/${faker.number.int()}`,
    };
});

export const downloadLink = createMockFactory<DownloadLink>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'DOWNLOAD_LINK',
        url: faker.internet.url(),
    };
});

export const downloadBinary = createMockFactory<DownloadBinary>(() => {
    return {
        label: faker.lorem.sentence(),
        type: 'DOWNLOAD_BINARY',
        reference: faker.lorem.sentence(),
    };
});

export const uiElements = [
    singleValue,
    multipleValues,
    multipleGroupedValues,
    referenceValue,
    referenceLink,
    downloadLink,
    downloadBinary,
];

export const uiElement = createMockFactory<UiElement>(() => {
    const element = faker.helpers.arrayElement(uiElements);
    return element();
});
