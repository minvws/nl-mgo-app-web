import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { useParamsData } from '$/routing';

import { HealthCategory } from '$/healthCategory';
import { UrlParamData } from '$/routing/useParamsData/useParamsData';
import { HealthcareOrganization, Resource } from '$/store';
import { missingBreadcrumbLabel, useTranslateBreadcrumb } from './useTranslateBreadcrumb';

const mockFormatMessage = vi.fn((value) => `intl(${value})`);
const mockHasMessage = vi.fn(() => true);

vi.mock('$/intl', () => ({
    useIntl: vi.fn(() => ({
        formatMessage: mockFormatMessage,
        hasMessage: mockHasMessage,
    })),
}));

vi.mock('$/routing', () => ({
    useParamsData: vi.fn(),
}));

describe('useTranslateBreadcrumb', () => {
    test.each<[string, Partial<UrlParamData>, string]>([
        ['foobar', {}, 'intl(foobar)'],
        [
            ':healthCategorySlug',
            { healthCategory: HealthCategory.Medication },
            'intl(hc_medication.heading)',
        ],
        [
            ':resourceSlug',
            { resource: { summary: { label: 'Test Resource' } } as Resource },
            'Test Resource',
        ],
        [
            ':organizationSlug',
            { organization: { name: 'Test Organization' } as HealthcareOrganization },
            'Test Organization',
        ],
    ])('should translate breadcrumb label %s', (breadcrumb, params, expected) => {
        mockHasMessage.mockReturnValue(true);
        vi.mocked(useParamsData).mockReturnValue(params as UrlParamData);
        const { result } = renderHook(() => useTranslateBreadcrumb());
        expect(result.current.translateBreadcrumb(breadcrumb)).toBe(expected);
    });

    test.each<[string, Partial<UrlParamData>, string]>([
        [':healthCategorySlug', { healthCategory: undefined }, missingBreadcrumbLabel],
        [
            ':resourceSlug',
            { resource: { summary: { label: '' } } as Resource },
            missingBreadcrumbLabel,
        ],
        [':resourceSlug', {}, missingBreadcrumbLabel],
        [
            ':organizationSlug',
            { organization: { name: '' } as HealthcareOrganization },
            missingBreadcrumbLabel,
        ],
        [':organizationSlug', {}, missingBreadcrumbLabel],
    ])(
        'should return "-" for breadcrumb label %s when there is no/falsy value found in the url params data',
        (breadcrumb, params, expected) => {
            mockHasMessage.mockReturnValue(true);
            vi.mocked(useParamsData).mockReturnValue(params as UrlParamData);
            const { result } = renderHook(() => useTranslateBreadcrumb());
            expect(result.current.translateBreadcrumb(breadcrumb)).toBe(expected);
        }
    );

    test(`should return "${missingBreadcrumbLabel}" for unknown breadcrumb when hasMessage returns false`, () => {
        vi.mocked(useParamsData).mockReturnValue({} as UrlParamData);
        mockHasMessage.mockReturnValueOnce(false);

        const { result } = renderHook(() => useTranslateBreadcrumb());
        expect(result.current.translateBreadcrumb('unknown.breadcrumb')).toBe(
            missingBreadcrumbLabel
        );
    });
});
