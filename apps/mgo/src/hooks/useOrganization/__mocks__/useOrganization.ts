import { faker } from '$test/faker';
import { vi } from 'vitest';

const organization = faker.custom.healthcareOrganization();
const getCommonClinicalDatasetService = vi.fn(() => null);
const getDocumentsService = vi.fn(() => null);

export function useOrganization() {
    return {
        organization,
        getCommonClinicalDatasetService,
        getDocumentsService,
    };
}
