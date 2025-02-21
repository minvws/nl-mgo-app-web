import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DesktopHeader } from './DesktopHeader';

test('renders the app name in the header', () => {
    setupWithAppProviders(<DesktopHeader />);

    expect(
        screen.getByRole('heading', {
            level: 2,
        })
    ).toHaveTextContent(appMessage('common.app_name'));
});
