/* c8 ignore start - this will be moved to another package soon */
import ky from 'ky';
import type {
    OrganisationSearchResponse,
    HealthcareOrganizationDTO,
    HealthcareServiceDTO,
} from './types';
import { readConfig } from '$/lib/config/config';

const client = ky.extend({
    prefixUrl: readConfig().load_url,
});

const search = async (searchQuery: { name: string; city: string }) =>
    client
        .post('localization/organization/search', {
            json: searchQuery,
        })
        .json<OrganisationSearchResponse>();

export type { OrganisationSearchResponse, HealthcareOrganizationDTO, HealthcareServiceDTO };

export function getLoadService() {
    return {
        search,
    };
}

export type LoadService = ReturnType<typeof getLoadService>;
