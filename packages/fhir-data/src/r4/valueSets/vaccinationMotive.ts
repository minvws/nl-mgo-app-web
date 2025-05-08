/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946006
 */
export const vaccinationMotiveValueSet = [
    {
        display: 'Immunisatie nodig vanuit vaccinatieprogramma (situatie)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '159741000146107',
    },
    {
        display: 'Immunisatie nodig vanuit rijksvaccinatieprogramma (situatie)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '159731000146104',
    },
    {
        display: 'Immunisatie nodig voor werk (situatie)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '159721000146101',
    },
    {
        display: 'Vaccinatie (verrichting)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '33879002',
    },
    {
        display: 'Passieve immunisatie (verrichting)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '51116004',
    },
    {
        display: 'Reizigersvaccinatie (verrichting)',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '14747002',
    },
] as const;
