import { type FhirClient, type FhirClientOptions, type FhirVersion } from '@minvws/mgo-fhir-client';

export enum DataServiceId {
    CommonClinicalDataset = '48',
    GeneralPractitioner = '49',
    PdfA = '51',
    VaccinationImmunization = '63',
}

export type DataService<V extends FhirVersion = FhirVersion> = FhirClient<V> & {
    dataServiceId: DataServiceId;
    fhirVersion: FhirVersion;
};

export type DataServiceOptions = Omit<FhirClientOptions, 'fhirVersion'>;
