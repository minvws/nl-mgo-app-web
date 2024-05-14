import { setupApp } from '$test/helpers';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('OnboardingIntro', () => {
    setupApp({
        initialEntries: ['/welkom'],
    });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent('Je gezond\u00ADheids\u00ADgegevens in één overzicht');

    fireEvent.click(screen.getByText(/volgende/i));

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});
