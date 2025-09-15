import { type FhirVersion } from '@minvws/mgo-fhir';
import { UiContext } from '../../context/index.js';
import { createUiElementHelper } from '../createUiElementHelper/createUiElementHelper.js';

export type GeneratorContext = {
    formatMessage: UiContext['formatMessage'];
    formatLabel: UiContext['formatLabel'];
    createUiElement: ReturnType<typeof createUiElementHelper>;
    fhirVersion: `${FhirVersion}`;
    rootPath: string;
};

export function createGeneratorContext(
    uiContext: UiContext,
    rootPath: string,
    fhirVersion: `${FhirVersion}`
): GeneratorContext {
    const { formatMessage, formatLabel } = uiContext;
    const createUiElement = createUiElementHelper(uiContext);

    return {
        formatMessage,
        formatLabel,
        createUiElement,
        fhirVersion,
        rootPath,
    };
}
