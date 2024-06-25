import { useParams } from '$/routing';
import { useOrganizationsStore } from '$/store/organizations';
import { getCommonClinicalDataset } from './commonClinicalDataset';

export function useOrganization() {
    const { organizationSlug } = useParams();
    const { getOrganizationBySlug } = useOrganizationsStore();
    const organization = getOrganizationBySlug(organizationSlug);

    return {
        organization,
        getCommonClinicalDataset: () => getCommonClinicalDataset(organization),
    };
}
