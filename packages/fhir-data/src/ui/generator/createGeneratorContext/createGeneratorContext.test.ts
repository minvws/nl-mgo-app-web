import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { createGeneratorContext } from './createGeneratorContext';

test('creates a snake_cased key that is used for translations', () => {
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const fhirVersion = faker.fhir.fhirVersion();
    const rootPath = faker.custom.fhirMessageId();
    const context = createGeneratorContext(healthUiSchemaContext, rootPath, fhirVersion);

    expect(context.formatMessage).toBe(healthUiSchemaContext.formatMessage);
    expect(context.formatLabel).toBe(healthUiSchemaContext.formatLabel);
    expect(context.createUiElement).toBeDefined();
    expect(context.fhirVersion).toBe(fhirVersion);
    expect(context.rootPath).toBe(rootPath);
});
