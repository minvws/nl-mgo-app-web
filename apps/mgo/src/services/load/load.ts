/* c8 ignore start - this will be moved to another package soon */
import { config } from '$/config';
import ky from 'ky';
import type {
    HealthcareOrganizationDTO,
    HealthcareServiceDTO,
    OrganisationSearchResponse,
} from './types';

const client = ky.extend({
    prefixUrl: config.load_url,
});

const search = async (searchQuery: { name: string; city: string }) =>
    client
        .post('localization/organization/search', {
            json: searchQuery,
        })
        .json<OrganisationSearchResponse>();

export type { HealthcareOrganizationDTO, HealthcareServiceDTO, OrganisationSearchResponse };

export function getLoadService() {
    return {
        search,
    };
}

export type LoadService = ReturnType<typeof getLoadService>;
