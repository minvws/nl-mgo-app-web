import { useOnboardingSeen } from '$/hooks';
import { setupApp } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('shows content and navigates to the login page', () => {
    setupApp({ initialEntries: ['/hoe-werkt-het'] });

    expect(useOnboardingSeen().isOnboardingSeen).toBe(false);
    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('proposition.heading'));

    fireEvent.click(screen.getByText(appMessage('common.next')));

    expect(useOnboardingSeen().isOnboardingSeen).toBe(true);
    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('login.heading'));
});
