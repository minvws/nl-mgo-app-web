import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MobileHeader } from './MobileHeader';

test('MobileHeader', () => {
    render(<MobileHeader />);

    expect(screen.getByRole('heading')).toHaveTextContent('Mijn Gezond\u00ADheids\u00ADoverzicht');
});
