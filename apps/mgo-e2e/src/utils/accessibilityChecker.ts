import { AxeBuilder } from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
const ENABLE_ACCESSIBILITY_CHECKS = process.env.ENABLE_ACCESSIBILITY_CHECKS === 'true';

interface HasPage {
    page: Page;
}

export async function runAccessibilityCheck(
    target: Page | HasPage,
    description: string
): Promise<void> {
    if (!ENABLE_ACCESSIBILITY_CHECKS) {
        return;
    }
    // TypeError due to playwright version mismatch between axe-core and playwright
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = 'page' in target ? target.page : (target as any);
    // Get axeBuilder from the fixture
    const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#commonly-reused-element-with-known-issue')
        .analyze();
    if (axeResults.violations.length > 0) {
        expect
            .soft(axeResults.violations, `Accessibility violations found in ${description} page`)
            .toEqual([]);
    }
}
