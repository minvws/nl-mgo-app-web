/* c8 ignore start - this will be moved to another pacakge soon */
import type { OrganisationSearchResponse } from '$/types/Organisation';
import ky from 'ky';

export const search = async (searchQuery: { name: string; city: string }) =>
    ky
        .post('https://lo-ad.test.mgo.irealisatie.nl/localization/organization/search', {
            json: searchQuery,
        })
        .json<OrganisationSearchResponse>();
