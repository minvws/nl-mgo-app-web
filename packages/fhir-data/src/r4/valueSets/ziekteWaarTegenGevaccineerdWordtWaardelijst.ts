/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628291
 */
export const ziekteWaarTegenGevaccineerdWordtWaardelijst = [
    {
        code: '6142004',
        display: 'Influenza (aandoening)',
    },
    {
        code: '16814004',
        display: 'Infectieziekte door Streptococcus pneumoniae (aandoening)',
    },
    {
        code: '840539006',
        display: `Aandoening door infectie door 'Severe acute respiratory syndrome'-coronavirus 2 (aandoening)`,
    },
    {
        code: '76902006',
        display: 'Tetanus (aandoening)',
    },
    {
        code: '128241005',
        display: 'Hepatitis (aandoening)',
    },
].map((x) => ({ ...x, system: 'http://snomed.info/sct' }) as const); // NOSONAR
