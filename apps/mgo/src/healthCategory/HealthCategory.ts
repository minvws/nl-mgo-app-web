export enum HealthCategory {
    Warning = 'alerts',
    AllergiesAndIntolerances = 'allergies',
    ContactsAndAppointments = 'appointments',
    Problems = 'complaints',
    MedicalDevices = 'devices',
    LaboratoryResults = 'lab_results',
    Lifestyle = 'lifestyle',
    Vitals = 'measurements',
    Medication = 'medication',
    FunctionalOrMentalStatus = 'mental',
    PersonalInformation = 'patient',
    PayerAndOrganization = 'payment',
    Documents = 'documents',
    TreatmentPlan = 'plans',
    Procedures = 'treatments',
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

export function getHealthCategoryBySlug(slug: string): HealthCategory | undefined {
    const entry = Object.entries(healthCategorySlugs).find(([_key, value]) => value === slug);
    if (!entry) {
        return;
    }
    return entry[0] as HealthCategory;
}
