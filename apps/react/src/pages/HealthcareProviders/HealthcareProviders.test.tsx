import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthcareProviders } from './HealthcareProviders';

test('healthcare providers', () => {
    render(<HealthcareProviders />);

    expect(screen.getByRole('heading')).toHaveTextContent('Zorgverleners');
});
