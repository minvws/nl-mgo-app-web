import { faker } from '$test';
import { type MgoCoding, type MgoCodingProps } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { type Nullable } from '@minvws/mgo-utils';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type UiContext } from '../../context/index.js';
import { system } from '../../format/system/system.js';
import { coding } from './coding.js';

const mockSystem = system as unknown as MockedFunction<typeof system>;

vi.mock('../../format/system/system', () => ({
    system: vi.fn((_context: UiContext) =>
        vi.fn((value: MgoCodingProps) => `system(${value.display})`)
    ),
}));

test('coding single', () => {
    const label = faker.custom.fhirMessageId();
    const mgoCoding: MgoCoding = faker.mgo.coding();
    const result = coding(faker.ui.context())(label, mgoCoding);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: {
            display: `system(${mgoCoding.display})`,
            code: mgoCoding.code,
            system: mgoCoding.system,
        },
    });
});

test('coding multiple', () => {
    const label = faker.custom.fhirMessageId();
    const mgoCoding: MgoCoding[] = [faker.mgo.coding(), faker.mgo.coding(), faker.mgo.coding()];
    const result = coding(faker.ui.context())(label, mgoCoding);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: [
            {
                display: `system(${mgoCoding[0].display})`,
                code: mgoCoding[0].code,
                system: mgoCoding[0].system,
            },
            {
                display: `system(${mgoCoding[1].display})`,
                code: mgoCoding[1].code,
                system: mgoCoding[1].system,
            },
            {
                display: `system(${mgoCoding[2].display})`,
                code: mgoCoding[2].code,
                system: mgoCoding[2].system,
            },
        ],
    });
});

test('coding multiple does not return undefined values', () => {
    const label = faker.custom.fhirMessageId();
    const mockFormatSystem = vi.fn((coding: Nullable<MgoCodingProps>) =>
        coding?.display ? `system(${coding.display})` : undefined
    );
    mockSystem.mockReturnValue(mockFormatSystem);

    const mgoCoding: MgoCoding[] = [faker.mgo.coding(), { _type: 'coding' }, faker.mgo.coding()];
    const result = coding(faker.ui.context())(label, mgoCoding);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: [
            {
                display: `system(${mgoCoding[0].display})`,
                code: mgoCoding[0].code,
                system: mgoCoding[0].system,
            },
            {
                display: `system(${mgoCoding[2].display})`,
                code: mgoCoding[2].code,
                system: mgoCoding[2].system,
            },
        ],
    });
});
