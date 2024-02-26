import { App } from '@/App';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';

const renderWithRouter = () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
};

test('introduction', () => {
    renderWithRouter();

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});
