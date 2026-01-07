/* c8 ignore start - this is still a work in progress, will be added to coverage later */

import {
    createSearchWorker,
    OrganizationItemDto,
    type SearchResults,
    type SearchWorker,
} from '@minvws/mgo-org-search';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash';
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

    const { mutateAsync: createIndex, isSuccess: indexReady } = useMutation({
        mutationFn: async () => {
            if (!searchWorker.current) {
                console.error('No search worker found');
                return;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - this is a test file, also including the json file in the tsconfig breaks typescript due to the large size of the file
            const organizationsModule = await import(`./organizations.json`);
            const organizations = organizationsModule.default as OrganizationItemDto[];
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
                console.error('No search worker found');
                return;
            }
            return await searchWorker.current.search(query);
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedRunSearch = useCallback(debounce(runSearch, 100), [runSearch]);

    useEffect(() => {
        createIndex();
    }, [createIndex]);

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
