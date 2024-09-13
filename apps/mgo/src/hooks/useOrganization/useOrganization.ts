import { useParams } from '$/routing';
import { useOrganizationsStore } from '$/store/organizations/organizations';
import { getCommonClinicalDatasetService, getDocumentsService } from '../../services';

export function useOrganization() {
    const { organizationSlug } = useParams();
    const { getOrganizationBySlug } = useOrganizationsStore();
    const organization = getOrganizationBySlug(organizationSlug);

    return {
        organization,
        getCommonClinicalDatasetService: () => getCommonClinicalDatasetService(organization),
        getDocumentsService: () => getDocumentsService(organization),
    };
}
