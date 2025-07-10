/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.zib2020/0.11.0-beta.1/files/2627855
 */
export const rolCodelijstValueSet = [
    {
        code: '1',
        display: 'Eerste relatie/contactpersoon',
    },
    {
        code: '2',
        display: 'Tweede relatie/contactpersoon',
    },
    {
        code: '3',
        display: 'Curator (juridisch)',
    },
    {
        code: '4',
        display: 'Financieel (gemachtigd)',
    },
    {
        code: '5',
        display: 'Financieel (toetsing)',
    },
    {
        code: '6',
        display: 'Leefeenheid',
    },
    {
        code: '7',
        display: 'Hulpverlener',
    },
    {
        code: '9',
        display: 'Anders',
    },
    {
        code: '11',
        display: 'Voogd',
    },
    {
        code: '14',
        display: 'Bewindvoerder',
    },
    {
        code: '15',
        display: 'Mentor',
    },
    {
        code: '19',
        display: 'Buur',
    },
    {
        code: '20',
        display: 'Vriend(in)/kennis',
    },
    {
        code: '21',
        display: 'Cliëntondersteuner',
    },
    {
        code: '23',
        display: 'Contactpersoon',
    },
    {
        code: '24',
        display: 'Wettelijke vertegenwoordiger',
    },
].map((x) => ({ ...x, system: 'urn:oid:2.16.840.1.113883.2.4.3.11.22.472' }) as const);
