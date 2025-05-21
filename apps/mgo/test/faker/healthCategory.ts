import { HealthCategory, healthCategorySlugs } from '$/healthCategory/HealthCategory';
import { faker } from '@faker-js/faker';

export const healthCategory = () => {
    return faker.helpers.arrayElement([
        HealthCategory.Warning,
        HealthCategory.AllergiesAndIntolerances,
        HealthCategory.ContactsAndAppointments,
        HealthCategory.Problems,
        HealthCategory.MedicalDevices,
        HealthCategory.LaboratoryResults,
        HealthCategory.Lifestyle,
        HealthCategory.Vitals,
        HealthCategory.Medication,
        HealthCategory.FunctionalOrMentalStatus,
        HealthCategory.PersonalInformation,
        HealthCategory.PayerAndOrganization,
        HealthCategory.Documents,
        HealthCategory.TreatmentPlan,
        HealthCategory.Procedures,
        HealthCategory.Vaccinations,
    ]);
};

export const healthCategorySlug = () => healthCategorySlugs[healthCategory()];
