export enum HealthCategory {
    Warning = 'warning',
    AllergiesAndIntolerances = 'allergies-and-intolerances',
    ContactsAndAppointments = 'contacts-and-appointments',
    Problems = 'problems',
    MedicalDevices = 'medical-devices',
    LaboratoryResults = 'labratory-results',
    Lifestyle = 'lifestyle',
    Vitals = 'vitals',
    Medication = 'medication',
    FunctionalOrMentalStatus = 'functional-or-mental-status',
    PersonalInformation = 'personal-information',
    PayerAndOrganization = 'payer-and-organization',
    Documents = 'documents',
    TreatmentPlan = 'treatment-plan',
    Procedures = 'procedures',
    Vaccinations = 'vaccinations',
}

export const healthCategorySlugs = {
    [HealthCategory.PersonalInformation]: 'persoonlijke-gegevens',
    [HealthCategory.PayerAndOrganization]: 'betaler-en-zorgaanbieder',
    [HealthCategory.TreatmentPlan]: 'behandelwensen-en-plan',
    [HealthCategory.Documents]: 'documenten',
    [HealthCategory.FunctionalOrMentalStatus]: 'functionele-of-mentale-status',
    [HealthCategory.Problems]: 'problemen',
    [HealthCategory.Lifestyle]: 'leefstijl',
    [HealthCategory.Warning]: 'waarschuwing',
    [HealthCategory.AllergiesAndIntolerances]: 'allergieen-en-intoleranties',
    [HealthCategory.Medication]: 'medicijnen',
    [HealthCategory.MedicalDevices]: 'medische-hulpmiddelen',
    [HealthCategory.Vaccinations]: 'vaccinaties',
    [HealthCategory.LaboratoryResults]: 'laboratorium-uitslagen',
    [HealthCategory.Procedures]: 'verrichtingen',
    [HealthCategory.ContactsAndAppointments]: 'contacten-en-afspraken',
    [HealthCategory.Vitals]: 'vitale-functies',
} as const satisfies Record<HealthCategory, string>;

export function getHealthCategoryBySlug(slug: string) {
    const entry = Object.entries(healthCategorySlugs).find(([_key, value]) => value === slug);
    if (!entry) {
        throw new Error(
            `No health category found for slug: "${slug}", this is most likely not a valid slug value.`
        );
    }
    return entry[0] as HealthCategory;
}
