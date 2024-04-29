/* c8 ignore start */
import type { OrganisationSearchResponse } from '$/types/Organisation';
import { healthcareOrganizationDTO } from '$test/data';
import { range } from 'lodash';

const searchResponse: OrganisationSearchResponse = {
    organizations: range(20).map(() => healthcareOrganizationDTO()),
};

export const search = async (_searchQuery: { name: string; city: string }) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500));

    return searchResponse;
};
