import { faker } from '@faker-js/faker';
import { DataServiceId } from '@minvws/mgo-data-services';

export function dataServiceId() {
    return faker.helpers.arrayElement([
        DataServiceId.CommonClinicalDataset,
        DataServiceId.GeneralPractitioner,
        DataServiceId.PdfA,
        DataServiceId.VaccinationImmunization,
    ]);
}
