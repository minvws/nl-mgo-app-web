import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { useParamsData } from '$/routing';

import { getHealthCategoryConfigs } from '$/config';
import { UrlParamData } from '$/routing/useParamsData/useParamsData';
import { faker } from '$test/faker';
import { missingBreadcrumbLabel, useTranslateBreadcrumb } from './useTranslateBreadcrumb';

const hoisted = vi.hoisted(() => ({
    getSummary: vi.fn(),
    formatMessage: vi.fn((value) => `intl(${value})`),
    hasMessage: vi.fn(() => true),
}));

vi.mock('$/intl', () => ({
    useIntl: vi.fn(() => ({
        formatMessage: hoisted.formatMessage,
        hasMessage: hoisted.hasMessage,
    })),
}));

vi.mock('$/routing', () => ({
    useParamsData: vi.fn(),
}));

vi.mock('$/hooks', () => ({
    useHealthUiSchema: vi.fn(() => ({
        getSummary: hoisted.getSummary,
    })),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('useTranslateBreadcrumb', () => {
    test('should translate the breadcrumb: ":organizationSlug"', () => {
        const organization = faker.custom.healthcareOrganization();
        vi.mocked(useParamsData).mockReturnValue({ organization } as UrlParamData);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':organizationSlug';
        const expected = organization.name;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should translate the breadcrumb: ":healthCategorySlug"', () => {
        const healthCategory = faker.helpers.arrayElement(getHealthCategoryConfigs());
        vi.mocked(useParamsData).mockReturnValue({ healthCategory } as UrlParamData);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':healthCategorySlug';
        const expected = hoisted.formatMessage(healthCategory.heading);

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should translate the breadcrumb: ":resourceSlug"', () => {
        const resource = faker.custom.resource();
        vi.mocked(useParamsData).mockReturnValue({ resource } as UrlParamData);
        const summary = { label: faker.lorem.sentence() };
        hoisted.getSummary.mockReturnValue(summary);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':resourceSlug';
        const expected = summary.label;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should translate the breadcrumb: custom breadcrumb', () => {
        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = faker.lorem.word();
        const expected = hoisted.formatMessage(input);

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should handle a missing translation for: ":organizationSlug"', () => {
        vi.mocked(useParamsData).mockReturnValue({} as UrlParamData);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':organizationSlug';
        const expected = missingBreadcrumbLabel;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should handle a missing translation for: ":healthCategorySlug"', () => {
        vi.mocked(useParamsData).mockReturnValue({} as UrlParamData);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':healthCategorySlug';
        const expected = missingBreadcrumbLabel;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should handle a missing translation for: ":resourceSlug"', () => {
        const resource = faker.custom.resource();
        vi.mocked(useParamsData).mockReturnValue({ resource } as UrlParamData);
        hoisted.getSummary.mockReturnValue(undefined);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':resourceSlug';
        const expected = missingBreadcrumbLabel;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should handle a missing translation for: ":resourceSlug" 2', () => {
        const resource = faker.custom.resource();
        vi.mocked(useParamsData).mockReturnValue({ resource } as UrlParamData);
        const summary = { label: undefined };
        hoisted.getSummary.mockReturnValue(summary);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = ':resourceSlug';
        const expected = missingBreadcrumbLabel;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });

    test('should handle a missing translation for: custom breadcrumb', () => {
        hoisted.hasMessage.mockReturnValue(false);
        const { result } = renderHook(() => useTranslateBreadcrumb());
        const input = faker.lorem.word();
        const expected = missingBreadcrumbLabel;

        expect(result.current.translateBreadcrumb(input)).toBe(expected);
    });
});
