/* c8 ignore start - this will be moved to another package soon */
import { config } from '$/config';
import ky from 'ky';
import { parseHealthcareOrganization } from './parseHealthcareOrganization';
import type { OrganisationSearchResponse } from './types';

const client = ky.extend({
    prefixUrl: config.load_url,
});

const search = async (searchQuery: { name: string; city: string }) => {
    const results = await client
        .post('localization/organization/search', {
            json: searchQuery,
        })
        .json<OrganisationSearchResponse>();

    return results.organizations.map(parseHealthcareOrganization);
};

export function getLoadService() {
    return {
        search,
    };
}

export type LoadService = ReturnType<typeof getLoadService>;

export { type HealthcareOrganizationSearchResult } from './parseHealthcareOrganization';
