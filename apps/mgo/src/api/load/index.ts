/* c8 ignore start - this will be moved to another package soon */
import ky from 'ky';
import type {
    OrganisationSearchResponse,
    HealthcareOrganizationDTO,
    HealthcareServiceDTO,
} from './types';

export const search = async (searchQuery: { name: string; city: string }) =>
    ky
        .post('https://lo-ad.test.mgo.irealisatie.nl/localization/organization/search', {
            json: searchQuery,
        })
        .json<OrganisationSearchResponse>();

export type { OrganisationSearchResponse, HealthcareOrganizationDTO, HealthcareServiceDTO };
