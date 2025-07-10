import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { Locale } from '@minvws/mgo-intl';
import { createSchemaContext } from '../src/ui';
import {
    type HealthUiSchemaContext,
    type SchemaContextOptions,
} from '../src/ui/context/schema/schema';
import { getUi } from '../src/ui/context/schema/ui';
import { faker } from './faker';

export interface TestUiSchemaOptions<T extends `${FhirVersion}`> extends SchemaContextOptions<T> {
    useMock: boolean;
}

export function testUiSchemaContext<T extends `${FhirVersion}` = `${FhirVersion.R3}`>(
    options: Partial<TestUiSchemaOptions<T>> = {}
): HealthUiSchemaContext<T> {
    if (options.useMock) {
        const mockUiHelperContext = faker.custom.uiHelperContext({ isSummary: options.isSummary });

        return {
            ui: getUi(mockUiHelperContext),
            resources: options.resources ?? [],
            organization: options.organization,
            ...mockUiHelperContext,
        };
    }

    return createSchemaContext<T>({
        locale: Locale.NL_NL,
        ignoreMissingTranslations: false,
        ...options,
    });
}
