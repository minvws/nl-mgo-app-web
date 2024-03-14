import { renderApp } from '$test/renderApp';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('OnboardingIntro', () => {
    renderApp({
        initialEntries: ['/welkom'],
    });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );

    fireEvent.click(screen.getByText(/volgende/i));

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});
