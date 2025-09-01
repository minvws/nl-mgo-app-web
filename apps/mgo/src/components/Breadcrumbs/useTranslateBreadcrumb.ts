import { useIntl } from '$/intl';
import { useParamsData } from '$/routing';

export const missingBreadcrumbLabel = '-';
export function useTranslateBreadcrumb() {
    const { formatMessage, hasMessage } = useIntl();
    const { resource, healthCategory, organization } = useParamsData();

    const translateBreadcrumb = (breadcrumb: string): string => {
        switch (breadcrumb) {
            case ':organizationSlug':
                return organization?.name || missingBreadcrumbLabel;
            case ':healthCategorySlug':
                if (!healthCategory) {
                    return missingBreadcrumbLabel;
                }
                return formatMessage(`hc_${healthCategory}.heading` as any);
            case ':resourceSlug':
                return resource?.summary.label || missingBreadcrumbLabel;
            default:
                if (hasMessage(breadcrumb)) {
                    return formatMessage(breadcrumb);
                }
                return missingBreadcrumbLabel;
        }
    };

    return { translateBreadcrumb };
}
