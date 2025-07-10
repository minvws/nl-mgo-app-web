import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { type HealthUiSchemaContext } from '../../context/schema/schema';
import { createUiElementHelper } from '../createUiElementHelper/createUiElementHelper';

export type GeneratorContext = {
    formatMessage: HealthUiSchemaContext['formatMessage'];
    formatLabel: HealthUiSchemaContext['formatLabel'];
    createUiElement: ReturnType<typeof createUiElementHelper>;
    fhirVersion: `${FhirVersion}`;
    rootPath: string;
};

export function createGeneratorContext(
    schemaContext: HealthUiSchemaContext,
    rootPath: string,
    fhirVersion: `${FhirVersion}`
): GeneratorContext {
    const { formatMessage, formatLabel } = schemaContext;
    const createUiElement = createUiElementHelper(schemaContext);

    return {
        formatMessage,
        formatLabel,
        createUiElement,
        fhirVersion,
        rootPath,
    };
}
