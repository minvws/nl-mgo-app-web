import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';
import { SearchOrganization } from './SearchOrganization';
import { SearchState } from './useSearchState';

const hoisted = vi.hoisted(() => ({
    useSearchState: vi.fn(),
    handleQueryChange: vi.fn(),
    ResultsList: vi.fn(() => <div data-testid="mocked-results-list">ResultsList</div>),
    searchState: {} as SearchState,
}));

vi.mock('./useSearchState', () => ({
    useSearchState: hoisted.useSearchState,
}));

vi.mock('./ResultsList', () => ({
    ResultsList: hoisted.ResultsList,
}));

function createSearchState(overrides: Partial<SearchState> = {}): SearchState {
    return {
        uiState: 'idle',
        searchQuery: '',
        handleQueryChange: hoisted.handleQueryChange,
        searchResults: undefined,
        dataServiceEndpoints: {},
        ...overrides,
    };
}

beforeEach(() => {
    vi.resetAllMocks();
    hoisted.searchState = createSearchState();
    hoisted.useSearchState.mockImplementation(() => hoisted.searchState);
});

test('shows spinner while loading', () => {
    hoisted.searchState.uiState = 'loading';

    setupWithAppProviders(<SearchOrganization />);

    expect(screen.getByLabelText(appMessage('common.loading'))).toBeVisible();
});

test('shows idle state when query is empty', () => {
    setupWithAppProviders(<SearchOrganization />);

    screen.getByRole('heading', {
        level: 1,
        name: appMessage('add_organization.heading'),
    });

    expect(
        screen.getByRole('heading', {
            name: appMessage('add_organization.default_content_heading'),
        })
    ).toBeVisible();
});

test('shows empty state after a non-matching query', () => {
    const query = faker.lorem.words();
    hoisted.searchState.uiState = 'empty';
    hoisted.searchState.searchQuery = query;
    setupWithAppProviders(<SearchOrganization />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        appMessage('organization_search.no_results_found_heading')
    );
});

test('shows results list when state is results', () => {
    hoisted.searchState.searchQuery = faker.lorem.words();
    hoisted.searchState.uiState = 'results';
    hoisted.searchState.searchResults = { count: 1, hits: [] };

    setupWithAppProviders(<SearchOrganization />);

    expect(screen.getByTestId('mocked-results-list')).toBeVisible();
});

test('calls handleQueryChange when typing in the search input', async () => {
    const query = faker.lorem.words();
    setupWithAppProviders(<SearchOrganization />);
    const input = screen.getByPlaceholderText(appMessage('add_organization.search_placeholder'));

    const user = userEvent.setup();
    await user.type(input, query);

    expect(hoisted.handleQueryChange).toHaveBeenCalled();
});

test('shows spinner while searching', () => {
    hoisted.searchState.uiState = 'searching';
    hoisted.searchState.searchQuery = faker.lorem.words();
    setupWithAppProviders(<SearchOrganization />);
    expect(screen.getByLabelText(appMessage('common.loading'))).toBeVisible();
});
