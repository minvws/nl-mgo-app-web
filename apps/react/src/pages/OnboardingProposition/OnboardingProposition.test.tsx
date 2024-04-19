import { useOnboardingSeen } from '$/hooks';
import { setupApp } from '$test/helpers';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('terms', () => {
    setupApp({ initialEntries: ['/hoe-werkt-het'] });

    expect(useOnboardingSeen().isOnboardingSeen).toBe(false);
    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');

    fireEvent.click(screen.getByText(/volgende/i));

    expect(useOnboardingSeen().isOnboardingSeen).toBe(true);
    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('back button', () => {
    setupApp({ initialEntries: ['/welkom', '/hoe-werkt-het'] });

    fireEvent.click(screen.getByText(/vorige/i));

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});
