/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316731
 */
export const resultTypeCodelist = [
    {
        display: 'Hematology',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '252275004',
    },
    {
        display: 'Chemistry',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '275711006',
    },
    {
        display: 'Serology',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '68793005',
    },
    {
        display: 'Virology',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '395124008',
    },
    {
        display: 'Toxicology',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '314076009',
    },
    {
        display: 'Microbiology',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '19851009',
    },
    {
        display: 'Molecular genetics',
        system: 'http://snomed.info/sct', // NOSONAR
        code: '405825005',
    },
] as const;
