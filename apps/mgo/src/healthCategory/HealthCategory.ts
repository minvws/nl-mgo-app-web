export enum HealthCategory {
    PersonalInformation = 'patient',
    PayerAndOrganization = 'payment',
    TreatmentPlan = 'plans',
    FunctionalOrMentalStatus = 'mental',
    Problems = 'complaints',
    Lifestyle = 'lifestyle',
    Warning = 'alerts',
    AllergiesAndIntolerances = 'allergies',
    Medication = 'medication',
    MedicalDevices = 'devices',
    Vaccinations = 'vaccinations',
    LaboratoryResults = 'lab_results',
    Procedures = 'treatments',
    ContactsAndAppointments = 'appointments',
    Vitals = 'measurements',
}

export const healthCategorySlugs = {
    [HealthCategory.PersonalInformation]: 'persoonlijke-gegevens',
    [HealthCategory.PayerAndOrganization]: 'betaler-en-zorgaanbieder',
    [HealthCategory.TreatmentPlan]: 'behandelwensen-en-plan',
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
