import { useOnboardingSeen } from '$/hooks';
import { message, setupApp } from '$test/helpers';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('shows content and navigates to the login page', () => {
    setupApp({ initialEntries: ['/hoe-werkt-het'] });

    expect(useOnboardingSeen().isOnboardingSeen).toBe(false);
    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(message('proposition.heading'));

    fireEvent.click(screen.getByText(message('common.next')));

    expect(useOnboardingSeen().isOnboardingSeen).toBe(true);
    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(message('login.heading'));
});
