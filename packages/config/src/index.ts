/* c8 ignore start */
import commonClinicalDataset from './data-services/48-common-clinical-dataset.json' with { type: 'json' };
import generalPractitionerData from './data-services/49-general-practitioner-data.json' with { type: 'json' };
import documentsPdfa from './data-services/51-documents-pdfa.json' with { type: 'json' };
import vaccinationImmunization from './data-services/63-vaccination-immunization.json' with { type: 'json' };
import healthCategories from './health-categories.json' with { type: 'json' };

const dataServices = {
    commonClinicalDataset,
    documentsPdfa,
    generalPractitionerData,
    vaccinationImmunization,
};

export { dataServices, healthCategories };
