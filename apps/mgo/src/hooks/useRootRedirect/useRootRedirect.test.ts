import { useAuth } from '$/auth';
import { faker } from '$test/faker';
import { renderHook } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { LOCAL_STORAGE_KEY } from '../useOnboardingSeen/useOnboardingSeen';
import { useRootRedirect } from './useRootRedirect';

vi.mock('$/auth');
const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

beforeEach(() => {
    mockUseAuth.mockRestore();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
});

test('redirects to /welkom when onboarding has not been seen', () => {
    const { result } = renderHook(() => useRootRedirect());

    expect(result.current).toEqual({
        to: '/welkom',
        label: 'common.mgo_header_login_link',
        ribbonLabel: 'common.rijkslint_login_link',
    });
});

test('redirects to /overzicht when onboarding done and user authenticated', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toISOString());
    mockUseAuth.mockReturnValue(faker.custom.authState({ isAuthenticated: true }));

    const { result } = renderHook(() => useRootRedirect());

    expect(result.current).toEqual({
        to: '/overzicht',
        label: 'common.mgo_header_link',
        ribbonLabel: 'common.rijkslint_link',
    });
});

test('redirects to /inloggen when onboarding done and user not authenticated', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toISOString());
    mockUseAuth.mockReturnValue(faker.custom.authState({ isAuthenticated: false }));

    const { result } = renderHook(() => useRootRedirect());

    expect(result.current).toEqual({
        to: '/inloggen',
        label: 'common.mgo_header_login_link',
        ribbonLabel: 'common.rijkslint_login_link',
    });
});
