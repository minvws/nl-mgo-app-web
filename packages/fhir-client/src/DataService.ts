export enum DataServiceId {
    CommonClinicalDataset = 48,
    GeneralPractitioner = 49,
    Documents = 51,
    Vaccinations = 63,
}

export interface DataService {
    dataServiceId: DataServiceId;
}
