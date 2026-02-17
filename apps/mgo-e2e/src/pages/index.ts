import { type Page } from '@playwright/test';
import { HealthCategoryPage } from './HealthCategory';
import { HealthDataDetailPage } from './HealthDataDetail';
import { HealthDataSummaryPage } from './HealthDataSummary';
import { IntroductionPage } from './Introduction';
import { LoginPage } from './Login';
import { OrganizationsPage } from './Organizations';
import { OverviewPage } from './Overview';
import { PrivacyStatementPage } from './PrivacyStatement';
import { PropositionPage } from './Proposition';
import { SearchOrganizationPage } from './SearchOrganization';

type PageConstructor = new (page: Page) => unknown;

// All pages are added to the default fixtures
export const pages = {
    pageIntroduction: IntroductionPage,
    pageProposition: PropositionPage,
    pagePrivacyStatement: PrivacyStatementPage,
    pageSearchOrganization: SearchOrganizationPage,
    pageLogin: LoginPage,
    pageOverview: OverviewPage,
    pageHealthCategory: HealthCategoryPage,
    pageHealthDataSummary: HealthDataSummaryPage,
    pageHealthDataDetail: HealthDataDetailPage,
    pageOrganizations: OrganizationsPage,
} satisfies Record<string, PageConstructor>;

export type Pages = typeof pages;
