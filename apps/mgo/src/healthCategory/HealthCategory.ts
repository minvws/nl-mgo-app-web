export enum HealthCategory {
    PersonalInformation = 'personal_information',
    PayerAndOrganization = 'payer_and_organization',
    TreatmentPlan = 'treatment_plan',
    FunctionalOrMentalStatus = 'functional_or_mental_status',
    Problems = 'problems',
    Lifestyle = 'lifestyle',
    Warning = 'warning',
    AllergiesAndIntolerances = 'allergies_and_intolerances',
    Medication = 'medication',
    MedicalDevices = 'medical_devices',
    Vaccinations = 'vaccinations',
    LaboratoryResults = 'laboratory_results',
    Procedures = 'procedures',
    ContactsAndAppointments = 'contacts_and_appointments',
    Vitals = 'vitals',
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
