export enum HealthCategory {
    PersonalInformation = 'personal_information',
    Payer = 'payer',
    TreatmentPlan = 'treatment_plan',
    // Medication = 'medication',
    // Allergies = 'allergies',
    // Complaints = 'complaints',
    // Documents = 'documents',
    // LabResults = 'lab_results',
    // Measurements = 'measurements',
    // Reports = 'reports',
    // Treatments = 'treatments',
    // Vaccinations = 'vaccinations',
}

export const healthCategorySlugs = {
    [HealthCategory.PersonalInformation]: 'persoonlijke_gegevens',
    [HealthCategory.Payer]: 'betaler_en_zorgaanbieder',
    [HealthCategory.TreatmentPlan]: 'behandelwensen_en_plan'
    // [HealthCategory.Medication]: 'medicijnen',
    // [HealthCategory.Allergies]: 'allergieën',
    // [HealthCategory.Complaints]: 'klachten',
    // [HealthCategory.Documents]: 'documenten',
    // [HealthCategory.LabResults]: 'resultaten',
    // [HealthCategory.Measurements]: 'metingen',
    // [HealthCategory.Reports]: 'verslagen',
    // [HealthCategory.Treatments]: 'behandelingen',
    // [HealthCategory.Vaccinations]: 'intentingen',
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