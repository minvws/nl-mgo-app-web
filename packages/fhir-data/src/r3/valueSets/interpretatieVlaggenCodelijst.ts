/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316739
 */
export const interpretatieVlaggenCodelijstValueSet = [
    {
        display: 'Above reference range',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '281302008',
    },
    {
        display: 'Below reference range',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '281300000',
    },
    {
        display: 'Intermediate',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '11896004',
    },
    {
        display: 'Resistant',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '30714006',
    },
    {
        display: 'Susceptible',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '131196009',
    },
] as const;
