import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { type HealthUiSchemaContext } from '../../context/schema/schema';
import { createUiElementHelper } from '../createUiElementHelper/createUiElementHelper';

export function createGeneratorContext(
    schemaContext: HealthUiSchemaContext,
    rootPath: string,
    fhirVersion: `${FhirVersion}`
) {
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

export type GeneratorContext = ReturnType<typeof createGeneratorContext>;
