import type { PatientFriendlyTermsList } from '$/services/pft/pftService';
import * as pftService from '$/services/pft/pftService';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { usePft } from './usePft';

vi.mock('$/services/pft/pftService', () => ({
    getPatientFriendlyTerms: vi.fn(),
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { readonly children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

test('returns PFT data when available', async () => {
    const mockData: PatientFriendlyTermsList = {
        '12345': {
            name: faker.lorem.word(),
            synonym: faker.lorem.word(),
            description: faker.lorem.sentence(),
        },
    };

    vi.mocked(pftService.getPatientFriendlyTerms).mockResolvedValue(mockData);

    const { result } = renderHook(
        () => usePft({ code: '12345', system: 'http://snomed.info/sct' }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pft).toEqual(mockData['12345']);
});

test('returns undefined of the system is not SNOMED', async () => {
    const mockData: PatientFriendlyTermsList = {
        '12345': {
            name: faker.lorem.word(),
            synonym: faker.lorem.word(),
            description: faker.lorem.sentence(),
        },
    };

    vi.mocked(pftService.getPatientFriendlyTerms).mockResolvedValue(mockData);

    const { result } = renderHook(() => usePft({ code: '12345', system: 'http://nosnomed.org' }), {
        wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.pft).toBeUndefined();
});

test('returns undefined for non-existent code', async () => {
    const mockData: PatientFriendlyTermsList = {
        '12345': {
            name: faker.lorem.word(),
            synonym: faker.lorem.word(),
            description: faker.lorem.sentence(),
        },
    };

    vi.mocked(pftService.getPatientFriendlyTerms).mockResolvedValue(mockData);

    const { result } = renderHook(() => usePft({ code: '1', system: 'http://snomed.info/sct' }), {
        wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pft).toBeUndefined();
});

test('returns undefined for if no code is supplied', async () => {
    const mockData: PatientFriendlyTermsList = {
        '12345': {
            name: faker.lorem.word(),
            synonym: faker.lorem.word(),
            description: faker.lorem.sentence(),
        },
    };

    vi.mocked(pftService.getPatientFriendlyTerms).mockResolvedValue(mockData);

    const { result } = renderHook(() => usePft(), {
        wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pft).toBeUndefined();
});
