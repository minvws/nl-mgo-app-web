import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { Introduction } from './Introduction';
import { getIntroSeen } from '@/lib/introSeen';

const renderWithRouter = () => {
    render(
        <MemoryRouter>
            <Introduction />
        </MemoryRouter>
    );
};

test('introduction', () => {
    renderWithRouter();

    expect(getIntroSeen()).toBe(false);

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Jouw gezond\u00ADheids\u00ADgegevens op één plek verzameld'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de app jouw gegevens');

    fireEvent.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(getIntroSeen()).toBe(true);
});
