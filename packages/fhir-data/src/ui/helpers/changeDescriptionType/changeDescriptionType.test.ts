import { faker } from '$test';
import { expect, test } from 'vitest';
import { type ValueDescription } from '../../types';
import { changeDescriptionType } from './changeDescriptionType';

test('changes the type of the description value', () => {
    const type = faker.lorem.word();
    const valueDescription: ValueDescription = {
        label: '',
        display: null,
        type,
    };
    const newType = faker.lorem.word();
    const updatedDescription = changeDescriptionType(valueDescription, type, newType);
    expect(updatedDescription.type).toEqual(newType);
});

test('does not change and sub paths', () => {
    const type = faker.lorem.word();
    const valueDescription: ValueDescription = {
        label: '',
        display: null,
        type: `${type}.foo.bar`,
    };
    const newType = faker.lorem.word();
    const updatedDescription = changeDescriptionType(valueDescription, type, newType);
    expect(updatedDescription.type).toEqual(`${newType}.foo.bar`);
});
