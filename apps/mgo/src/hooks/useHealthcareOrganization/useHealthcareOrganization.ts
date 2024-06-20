import { useParams } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store/healthcareOrganizations';
import { getCommonClinicalDataset } from './commonClinicalDataset';

export function useHealthcareOrganization() {
    const { healthcareOrganizationSlug } = useParams();
    const { getOrganizationBySlug } = useHealthcareOrganizationsStore();
    const organization = getOrganizationBySlug(healthcareOrganizationSlug);

    return {
        organization,
        getCommonClinicalDataset: () => getCommonClinicalDataset(organization),
    };
}
