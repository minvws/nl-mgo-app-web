import { type FhirVersion } from '@minvws/mgo-fhir';
import { createUiHelpers } from '@minvws/mgo-hcim-ui';
import { uiFaker } from '@minvws/mgo-hcim-ui/test/shared';
import {
    type SchemaContext,
    type SchemaOptions,
    createSchemaContext,
} from '../src/api/schemaContext/schemaContext.js';

export interface TestSchemaOptions<T extends FhirVersion> extends SchemaOptions<T> {
    useMock: boolean;
}

export function testSchemaContext<T extends FhirVersion = 'R3'>(
    options: Partial<TestSchemaOptions<T>> = {}
): SchemaContext<T> {
    if (options.useMock) {
        const mockUiContext = uiFaker.context();

        return {
            ui: createUiHelpers(mockUiContext),
            resources: options.resources ?? [],
            organization: options.organization,
            ...mockUiContext,
        };
    }

    return createSchemaContext<T>({
        locale: 'nl-NL',
        ignoreMissingTranslations: false,
        ...options,
    });
}
