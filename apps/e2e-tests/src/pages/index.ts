import { type Page } from '@playwright/test';
import { AddOrganizationPage } from './AddOrganization';
import { AddOrganizationListPage } from './AddOrganizationList';
import { HealthCategoryPage } from './HealthCategory';
import { HealthDataDetailPage } from './HealthDataDetail';
import { HealthDataSummaryPage } from './HealthDataSummary';
import { IntroductionPage } from './Introduction';
import { LoginPage } from './Login';
import { OverviewPage } from './Overview';
import { PrivacyStatementPage } from './PrivacyStatement';
import { PropositionPage } from './Proposition';

type PageConstructor = new (page: Page) => unknown;

// All pages are added to the default fixtures
export const pages = {
    pageIntroduction: IntroductionPage,
    pageProposition: PropositionPage,
    pagePrivacyStatement: PrivacyStatementPage,
    pageAddOrganization: AddOrganizationPage,
    pageAddOrganizationList: AddOrganizationListPage,
    pageLogin: LoginPage,
    pageOverview: OverviewPage,
    pageHealthCategory: HealthCategoryPage,
    pageHealthDataSummary: HealthDataSummaryPage,
    pageHealthDataDetail: HealthDataDetailPage,
} satisfies Record<string, PageConstructor>;

export type Pages = typeof pages;
