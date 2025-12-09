/* c8 ignore start - this is still a work in progress, will be added to coverage later */

import {
    createSearchWorker,
    OrganizationItem,
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
    const searchWorker = useRef<SearchWorker>();
    const isUnmountedRef = useRef(false);

    const { mutateAsync: createWorker, isSuccess: indexReady } = useMutation({
        mutationFn: async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - this is a test file, also including the json file in the tsconfig breaks typescript due to the large size of the file
            const organizationsModule = await import(`./providers-normalized.json`);
            const organizations = organizationsModule.default as OrganizationItem[];
            const worker = await createSearchWorker(organizations);
            if (!isUnmountedRef.current) {
                searchWorker.current = worker;
            }
            return worker;
        },
    });

    useEffect(() => {
        isUnmountedRef.current = false;
        const workerCreation = createWorker();
        return () => {
            isUnmountedRef.current = true;
            if (searchWorker.current) {
                searchWorker.current.terminate();
                searchWorker.current = undefined;
            } else {
                workerCreation.then((worker) => {
                    worker.terminate();
                });
            }
        };
    }, [createWorker]);

    const {
        mutateAsync: runSearch,
        data: searchResults,
        isPending: isSearching,
    } = useMutation({
        mutationFn: async (query: string) => {
            if (!searchWorker.current) {
                return;
            }
            return await searchWorker.current.search(query);
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedRunSearch = useCallback(debounce(runSearch, 100), [runSearch]);

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
