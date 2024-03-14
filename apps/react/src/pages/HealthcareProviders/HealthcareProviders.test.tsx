import { renderWithAppProviders } from '$test/renderApp';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthcareProviders } from './HealthcareProviders';

test('healthcare providers', () => {
    renderWithAppProviders(<HealthcareProviders />);

    expect(screen.getByRole('heading')).toHaveTextContent('Zorgverleners');
});
