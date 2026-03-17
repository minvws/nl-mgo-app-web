import { appConfig } from '$/config';
import { useLogger } from '$/hooks';
import {
    createSearchWorker,
    OrganizationDto,
    type SearchResults,
    type SearchWorker,
} from '@minvws/mgo-org-search';
import { useMutation, useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

type SearchFunction = (query: string) => Promise<SearchResults>;

export interface UseSearchWorkerResult {
    search: SearchFunction;
    isInitialized: boolean;
    isSearching: boolean;
    searchResults?: SearchResults;
}

export function useSearchWorker(): UseSearchWorkerResult {
    const searchWorker = useRef<SearchWorker>(undefined);
    const { log } = useLogger();

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

    const { mutateAsync: createIndex, isSuccess: isInitialized } = useMutation({
        mutationFn: async (organizations: OrganizationDto[]) => {
            if (!searchWorker.current) {
                log.error('No search worker found');
                return;
            }
            await searchWorker.current.createIndex(organizations);
        },
    });

    const {
        mutateAsync: runSearch,
        data: searchResults,
        isPending: isSearching,
    } = useMutation({
        mutationFn: async (query: string) => {
            if (!searchWorker.current) {
                log.error('No search worker found');
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
        isInitialized,
        isSearching,
    };
}
