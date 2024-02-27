import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { getIntroSeen } from '$/lib/introSeen';
import { App } from '$/App';

test('terms', () => {
    render(
        <MemoryRouter initialEntries={['/voorwaarden']}>
            <App />
        </MemoryRouter>
    );

    expect(getIntroSeen()).toBe(false);
    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');

    fireEvent.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(getIntroSeen()).toBe(true);
    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});
