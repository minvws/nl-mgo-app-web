import { faker } from '@faker-js/faker';
import { DataServiceId } from '@minvws/mgo-fhir-client';

export function dataServiceId() {
    const dataServiceIds = Object.values(DataServiceId).filter((x) => typeof x === 'number');
    return faker.helpers.arrayElement(dataServiceIds) as DataServiceId;
}
