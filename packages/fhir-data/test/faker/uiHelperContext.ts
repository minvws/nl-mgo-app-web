import { createHelpers, type FhirIntlShape } from '@minvws/mgo-mgo-intl';
import { createTestIntl } from '@minvws/mgo-mgo-intl/test';
import { type UiHelperContext } from '../../src/ui/context';
import { createMockDataFactory } from './factory';

const mockIntl = createTestIntl<string>() as FhirIntlShape;

export const uiHelperContext = createMockDataFactory<UiHelperContext>(() => {
    return {
        intl: mockIntl,
        isSummary: false,
        ...createHelpers(mockIntl),
    };
});
