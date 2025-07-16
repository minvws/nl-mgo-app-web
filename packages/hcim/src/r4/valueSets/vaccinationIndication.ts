/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628292
 */
export const vaccinationIndicationValueSet = [
    {
        display: 'Kwetsbare oudere (bevinding)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '404904002',
    },
    {
        display: 'Aandoening van long (aandoening)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '19829001',
    },
    {
        display: 'Overgewicht (bevinding)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '238131007',
    },
    {
        display: 'Immunodeficiëntie (aandoening)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '234532001',
    },
    {
        display: 'Zwangerschap (bevinding)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '77386006',
    },
    {
        display: 'Verwonding (aandoening)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '416462003',
    },
] as const;
