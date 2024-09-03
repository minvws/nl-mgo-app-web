import { faker } from '$test/faker';
import { vi } from 'vitest';

const organization = faker.custom.healthcareOrganization();
const getCommonClinicalDataset = vi.fn(() => null);
const getGeneralPractitionerDataset = vi.fn(() => null);
const getDocumentDataset = vi.fn(() => null);

export function useOrganization() {
    return {
        organization,
        getCommonClinicalDataset,
        getGeneralPractitionerDataset,
        getDocumentDataset,
    };
}
