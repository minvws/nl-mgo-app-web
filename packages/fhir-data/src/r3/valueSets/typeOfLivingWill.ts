/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316873
 */
export const typeOfLivingWillValueSet = [
    {
        display: 'Other',
        system: 'http://hl7.org/fhir/v3/NullFlavor', // NOSONAR;
        code: 'OTH',
    },

    {
        display: 'Niet reanimeren verklaring',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'NR',
    },
    {
        display: 'Volmacht',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'VOL',
    },
    {
        display: 'Behandelverbod',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'VERB',
    },
    {
        display: 'Behandelverbod met aanvulling Voltooid Leven',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'VERBVL',
    },
    {
        display: 'Mondelinge afspraak',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'MON',
    },
    {
        display: 'Euthanasieverzoek',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'EU',
    },
    {
        display: 'Euthanasieverzoek met aanvulling Dementie',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'EUD',
    },
    {
        display: 'Levenswensverklaring',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'LW',
    },
    {
        display: 'Verklaring donorschap',
        system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.14.1',
        code: 'DO',
    },
] as const;
