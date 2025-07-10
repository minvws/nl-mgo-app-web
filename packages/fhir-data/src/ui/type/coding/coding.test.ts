import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type MgoCoding } from '../../../parse/type';
import { coding } from './coding';

import { type Nullable } from '@minvws/mgo-utils';
import { type MgoCodingProps } from '../../../parse/type/coding/coding';
import { type UiHelperContext } from '../../context';
import { system } from '../../format/system/system';

const mockSystem = system as unknown as MockedFunction<typeof system>;

vi.mock('../../format/system/system', () => ({
    system: vi.fn((_context: UiHelperContext) => vi.fn(() => 'system')),
}));

test('coding single', () => {
    const label = faker.custom.fhirMessageId();
    const mockFormatSystem = vi.fn(() => 'system');
    mockSystem.mockReturnValue(mockFormatSystem);

    const mgoCoding: MgoCoding = faker.mgo.coding();
    const result = coding(faker.custom.uiHelperContext())(label, mgoCoding);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: 'system',
    });
    expect(mockFormatSystem).toHaveBeenCalledWith(mgoCoding);
});

test('coding multiple', () => {
    const label = faker.custom.fhirMessageId();
    const mockFormatSystem = vi.fn(() => 'system');
    mockSystem.mockReturnValue(mockFormatSystem);

    const mgoCoding: MgoCoding[] = [faker.mgo.coding(), faker.mgo.coding(), faker.mgo.coding()];
    const result = coding(faker.custom.uiHelperContext())(label, mgoCoding);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: ['system', 'system', 'system'],
    });

    expect(mockFormatSystem).toHaveBeenNthCalledWith(1, mgoCoding[0], 0, mgoCoding);
    expect(mockFormatSystem).toHaveBeenNthCalledWith(2, mgoCoding[1], 1, mgoCoding);
    expect(mockFormatSystem).toHaveBeenNthCalledWith(3, mgoCoding[2], 2, mgoCoding);
});

test('coding multiple does not return undefined values', () => {
    const label = faker.custom.fhirMessageId();
    const mockFormatSystem = vi.fn((coding: Nullable<MgoCodingProps>) =>
        coding?.system ? 'system' : undefined
    );
    mockSystem.mockReturnValue(mockFormatSystem);

    const mgoCoding: MgoCoding[] = [faker.mgo.coding(), { _type: 'coding' }, faker.mgo.coding()];
    const result = coding(faker.custom.uiHelperContext())(label, mgoCoding);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: ['system', 'system'],
    });

    expect(mockFormatSystem).toHaveBeenNthCalledWith(1, mgoCoding[0], 0, mgoCoding);
    expect(mockFormatSystem).toHaveBeenNthCalledWith(2, mgoCoding[1], 1, mgoCoding);
    expect(mockFormatSystem).toHaveBeenNthCalledWith(3, mgoCoding[2], 2, mgoCoding);
});
