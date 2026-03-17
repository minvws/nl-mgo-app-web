import { appConfig } from '$/config';
import { SearchResults } from '@minvws/mgo-org-search';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { useEffect, useRef, useState } from 'react';
import { useSearchWorker } from './useSearchWorker';

export type SearchUiState = 'loading' | 'searching' | 'idle' | 'results' | 'empty';

export type SearchState = {
    uiState: SearchUiState;
    searchQuery: string;
    handleQueryChange: (query: string) => void;
    searchResults?: SearchResults;
    dataServiceEndpoints: Record<string, string>;
};

export function useSearchState(): SearchState {
    const [searchQuery, setSearchQuery] = useState('');
    const { search, isInitialized, isSearching, searchResults } = useSearchWorker();

    const { data: dataServiceEndpoints = {}, isSuccess: dataServiceEndpointsLoaded } = useQuery<
        Record<string, string>
    >({
        queryKey: ['data-service-endpoints'],
        queryFn: () => ky.get(appConfig.data_service_endpoints_url).json(),
    });

    const readyForSearch = isInitialized && dataServiceEndpointsLoaded;
    const prevReadyForSearch = useRef(readyForSearch);

    const handleQueryChange = (query: string) => {
        setSearchQuery(query);
        if (readyForSearch) {
            search(query);
        }
    };

    /**
     * When readiness arrives after the user has already typed a query,
     * replay the search so results appear without requiring another keystroke.
     */
    useEffect(() => {
        const justBecameReady = !prevReadyForSearch.current && readyForSearch;
        if (justBecameReady && searchQuery) {
            search(searchQuery);
        }
        prevReadyForSearch.current = readyForSearch;
    }, [readyForSearch, searchQuery, search]);

    const uiState: SearchUiState = (() => {
        if (!readyForSearch) return 'loading';
        if (!searchQuery) return 'idle';
        if (isSearching) return 'searching';
        if (searchResults?.count) return 'results';
        return 'empty';
    })();

    return {
        searchQuery,
        handleQueryChange,
        uiState,
        searchResults,
        dataServiceEndpoints,
    };
}
