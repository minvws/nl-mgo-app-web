/* v8 ignore start - this is still a work in progress, will be added to coverage later */

import { appConfig } from '$/config';
import {
    createSearchWorker,
    OrganizationDto,
    type SearchResults,
    type SearchWorker,
} from '@minvws/mgo-org-search';
import { useMutation, useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { debounce, uniqBy } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

type SearchFunction = (query: string) => Promise<SearchResults>;

export interface UseSearchResult {
    search: SearchFunction;
    isInitializing: boolean;
    isSearching: boolean;
    searchResults?: SearchResults;
}

export function useSearch(): UseSearchResult {
    const searchWorker = useRef<SearchWorker>(undefined);

    useEffect(() => {
        searchWorker.current = createSearchWorker();
        return () => {
            searchWorker.current?.terminate();
        };
    }, []);

    const { data: organizations, isSuccess: organizationsLoaded } = useQuery<OrganizationDto[]>({
        queryKey: ['organizations-data'],
        queryFn: () => ky.get(appConfig.organizations_url).json(),
    });

    const { mutateAsync: createIndex, isSuccess: indexReady } = useMutation({
        mutationFn: async (organizations: OrganizationDto[]) => {
            if (!searchWorker.current) {
                console.error('No search worker found');
                return;
            }
            /**
             * Currently this list is not final and contains duplicates.
             * This will be fixed in the future.
             * For now we need to remove duplicates by id.
             * This is a temporary solution to ensure the search index is created correctly.
             */
            const uniqueOrganizations = uniqBy(organizations, 'id');
            await searchWorker.current.createIndex(uniqueOrganizations);
        },
    });

    const {
        mutateAsync: runSearch,
        data: searchResults,
        isPending: isSearching,
    } = useMutation({
        mutationFn: async (query: string) => {
            if (!searchWorker.current) {
                console.error('No search worker found');
                return;
            }
            return await searchWorker.current.search(query);
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedRunSearch = useCallback(debounce(runSearch, 100), [runSearch]);

    useEffect(() => {
        if (organizationsLoaded && organizations) {
            createIndex(organizations);
        }
    }, [organizationsLoaded, organizations, createIndex]);

    useEffect(() => {
        return () => {
            debouncedRunSearch.cancel();
        };
    }, [debouncedRunSearch]);

    return {
        search: debouncedRunSearch as SearchFunction,
        searchResults,
        isInitializing: !indexReady,
        isSearching,
    };
}
