import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Organization, type SearchResult } from '@minvws/mgo-org-search';
import { screen, within } from '@testing-library/react';
import { createRef } from 'react';
import { beforeEach, expect, test, vi } from 'vitest';
import { mockLogError } from '../../hooks/useLogger/__mocks__/useLogger';
import { AddOrganizationDialog } from './AddOrganizationDialog';

const hoisted = vi.hoisted(() => ({
    mockNavigate: vi.fn(),
}));

vi.mock('$/routing', () => ({
    useNavigate: () => hoisted.mockNavigate,
}));
vi.mock('$/hooks/useLogger/useLogger');

function createDataServiceEndpoints(organization: Organization) {
    return (organization.dataServices ?? []).reduce(
        (acc, dataService) => ({
            ...acc,
            ...{
                [dataService.resourceEndpoint ?? '']: faker.internet.url(),
                [dataService.authEndpoint ?? '']: faker.internet.url(),
                [dataService.tokenEndpoint ?? '']: faker.internet.url(),
            },
        }),
        {} as Record<string, string>
    );
}

function createSelectedSearchResult(overrides: Partial<SearchResult> = {}): SearchResult {
    const organization = faker.custom.organizationSearchResult();
    return {
        id: organization.id,
        document: organization,
        score: 1,
        ...overrides,
    } as SearchResult;
}

beforeEach(() => {
    vi.resetAllMocks();
    useStore.setState({
        organizations: [],
    });
});

test('adds organization to store when confirming the dialog', async () => {
    const selectedSearchResult = createSelectedSearchResult();
    const dataServiceEndpoints = createDataServiceEndpoints(selectedSearchResult.document);
    const { user } = setupWithAppProviders(
        <AddOrganizationDialog
            isOpen
            setIsOpen={vi.fn()}
            selectedSearchResult={selectedSearchResult}
            dataServiceEndpoints={dataServiceEndpoints}
            confirmDialogTriggerRef={createRef<HTMLButtonElement>()}
        />
    );

    const confirmButtonName = appMessage('dialog.add_organization_yes');

    let state = useStore.getState();
    expect(state.organizations.length).toBe(0);

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    await user.click(
        within(dialog).getByRole('button', {
            name: confirmButtonName,
        })
    );

    state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(hoisted.mockNavigate).toHaveBeenCalledWith('/zorgaanbieders');
});

test('does not add organization when there is no selected search result', async () => {
    const { user } = setupWithAppProviders(
        <AddOrganizationDialog
            isOpen
            setIsOpen={vi.fn()}
            selectedSearchResult={null}
            dataServiceEndpoints={{}}
            confirmDialogTriggerRef={createRef<HTMLButtonElement>()}
        />
    );

    const stateBefore = useStore.getState();
    expect(stateBefore.organizations.length).toBe(0);

    const confirmButtonName = appMessage('dialog.add_organization_yes');
    const dialog = screen.getByRole('alertdialog');
    await user.click(
        within(dialog).getByRole('button', {
            name: confirmButtonName,
        })
    );

    const stateAfter = useStore.getState();
    expect(stateAfter.organizations.length).toBe(0);
    expect(hoisted.mockNavigate).not.toHaveBeenCalled();
    expect(mockLogError).toHaveBeenCalledWith(
        'Attempted to add organization without a selected search result (organization'
    );
});

test('does not add organization when selected organization has no data services', async () => {
    const selectedSearchResult = createSelectedSearchResult({
        document: {
            ...faker.custom.organizationSearchResult(),
            dataServices: [],
        },
    });

    const { user } = setupWithAppProviders(
        <AddOrganizationDialog
            isOpen
            setIsOpen={vi.fn()}
            selectedSearchResult={selectedSearchResult}
            dataServiceEndpoints={{}}
            confirmDialogTriggerRef={createRef<HTMLButtonElement>()}
        />
    );

    const confirmButtonName = appMessage('dialog.add_organization_yes');
    const dialog = screen.getByRole('alertdialog');
    await user.click(
        within(dialog).getByRole('button', {
            name: confirmButtonName,
        })
    );

    const stateAfter = useStore.getState();
    expect(stateAfter.organizations.length).toBe(0);
    expect(hoisted.mockNavigate).not.toHaveBeenCalled();
    expect(mockLogError).toHaveBeenCalledWith(
        'Attempted to add organization without data services'
    );
});

test('logs error when an endpoint key is missing in dataServiceEndpoints', async () => {
    const selectedSearchResult = createSelectedSearchResult();
    const missingResourceEndpointKey = faker.string.alphanumeric(12);
    const firstDataService =
        selectedSearchResult.document.dataServices?.[0] ??
        ({} as NonNullable<Organization['dataServices']>[number]);
    selectedSearchResult.document.dataServices = [
        {
            ...firstDataService,
            resourceEndpoint: missingResourceEndpointKey,
        },
    ];
    const dataServiceEndpoints = createDataServiceEndpoints(selectedSearchResult.document);
    delete dataServiceEndpoints[missingResourceEndpointKey];

    const { user } = setupWithAppProviders(
        <AddOrganizationDialog
            isOpen
            setIsOpen={vi.fn()}
            selectedSearchResult={selectedSearchResult}
            dataServiceEndpoints={dataServiceEndpoints}
            confirmDialogTriggerRef={createRef<HTMLButtonElement>()}
        />
    );

    const confirmButtonName = appMessage('dialog.add_organization_yes');
    const dialog = screen.getByRole('alertdialog');
    await user.click(
        within(dialog).getByRole('button', {
            name: confirmButtonName,
        })
    );

    expect(mockLogError).toHaveBeenCalledWith(
        `Data service endpoint for key "${missingResourceEndpointKey}" not found in dataServiceEndpoints`
    );

    const storedOrganization = useStore.getState().organizations[0];
    expect(storedOrganization?.dataServices?.[0]?.resourceEndpoint).toBe(
        'data-service-endpoint-not-found'
    );
    expect(hoisted.mockNavigate).toHaveBeenCalledWith('/zorgaanbieders');
});
