/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316796
 */
export const relatieCodelijstValueSet = [
    {
        display: 'Other',
        system: 'http://hl7.org/fhir/v3/NullFlavor', // NOSONAR;
        code: 'OTH',
    } as const,
    ...[
        { code: 'ADOPTF', display: 'Adoptive father' },
        { code: 'ADOPTM', display: 'Adoptive mother' },
        { code: 'AUNT', display: 'Aunt' },
        { code: 'BRO', display: 'Brother' },
        { code: 'BROINLAW', display: 'Brother-in-law' },
        { code: 'COUSN', display: 'Cousin' },
        { code: 'DAUC', display: 'Daughter' },
        { code: 'DAUINLAW', display: 'Daughter in-law' },
        { code: 'DOMPART', display: 'Domestic partner' },
        { code: 'FTH', display: 'Father' },
        { code: 'FTHINLAW', display: 'Father-in-law' },
        { code: 'DAUFOST', display: 'Foster daughter' },
        { code: 'FTHFOST', display: 'Foster father' },
        { code: 'MTHFOST', display: 'Foster mother' },
        { code: 'SONFOST', display: 'Foster son' },
        { code: 'GRNDDAU', display: 'Granddaughter' },
        { code: 'GRFTH', display: 'Grandfather' },
        { code: 'GRMTH', display: 'Grandmother' },
        { code: 'GRNDSON', display: 'Grandson' },
        { code: 'GGRFTH', display: 'Great grandfather' },
        { code: 'GGRMTH', display: 'Great grandmother' },
        { code: 'HUSB', display: 'Husband' },
        { code: 'MTH', display: 'Mother' },
        { code: 'MTHINLAW', display: 'Mother-in-law' },
        { code: 'NEPHEW', display: 'Nephew' },
        { code: 'NIECE', display: 'Niece' },
        { code: 'SIS', display: 'Sister' },
        { code: 'SISINLAW', display: 'Sister-in-law' },
        { code: 'SONC', display: 'Son' },
        { code: 'SONINLAW', display: 'Son in-law' },
        { code: 'STPFTH', display: 'Stepfather' },
        { code: 'STPMTH', display: 'Stepmother' },
        { code: 'UNCLE', display: 'Uncle' },
        { code: 'WIFE', display: 'Wife' },
    ].map((x) => ({ ...x, system: 'http://hl7.org/fhir/v3/RoleCode' }) as const), // NOSONAR
];
