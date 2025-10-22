/* c8 ignore start */
import commonClinicalDataset from './data-services/48-common-clinical-dataset.json' with { type: 'json' };
import generalPractitionerData from './data-services/49-general-practitioner-data.json' with { type: 'json' };
import mentalHealthCareInformation from './data-services/50-mental-health-care-information.json' with { type: 'json' };
import documentsPdfa from './data-services/51-documents-pdfa.json' with { type: 'json' };
import longTermHealthcare from './data-services/61-long-term-healthcare-information.json' with { type: 'json' };
import vaccinationImmunization from './data-services/63-vaccination-immunization.json' with { type: 'json' };
import healthCategoriesConfig from './health-categories.json' with { type: 'json' };

const dataServicesConfig = {
    commonClinicalDataset,
    documentsPdfa,
    generalPractitionerData,
    vaccinationImmunization,
    longTermHealthcare,
    mentalHealthCareInformation,
};

export { dataServicesConfig, healthCategoriesConfig };

export type MainHealthCategoryConfig = (typeof healthCategoriesConfig)[number];
export type HealthCategoryConfig = MainHealthCategoryConfig['categories'][number];
export type SubHealthCategoryConfig = HealthCategoryConfig['subcategories'][number];

export type DataServiceConfig = (typeof dataServicesConfig)[keyof typeof dataServicesConfig];
export type DataServiceEndpointConfig = DataServiceConfig['endpoints'][number];
