import { setupApp } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('shows heading and navigates to the next page', () => {
    setupApp({
        initialEntries: ['/welkom'],
    });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('introduction.heading'));

    fireEvent.click(screen.getByText(appMessage('common.next')));

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('proposition.heading'));
});
