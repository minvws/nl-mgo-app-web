import { faker } from '$test';
import { expect, test } from 'vitest';
import { createGeneratorContext } from './createGeneratorContext.js';

test('creates a snake_cased key that is used for translations', () => {
    const uiContext = faker.ui.context();
    const fhirVersion = faker.fhir.fhirVersion();
    const rootPath = faker.custom.fhirMessageId();
    const context = createGeneratorContext(uiContext, rootPath, fhirVersion);

    expect(context.formatMessage).toBe(uiContext.formatMessage);
    expect(context.formatLabel).toBe(uiContext.formatLabel);
    expect(context.createUiElement).toBeDefined();
    expect(context.fhirVersion).toBe(fhirVersion);
    expect(context.rootPath).toBe(rootPath);
});
