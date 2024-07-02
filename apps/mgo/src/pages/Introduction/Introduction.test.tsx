import { message, setupApp } from '$test/helpers';
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
    ).toHaveTextContent(message('introduction.heading'));

    fireEvent.click(screen.getByText(message('common.next')));

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(message('proposition.heading'));
});
