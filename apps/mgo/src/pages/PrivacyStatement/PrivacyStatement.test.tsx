import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test } from 'vitest';
import { PrivacyStatement } from './PrivacyStatement';

test('shows privacy statement', async () => {
    setupWithAppProviders(<PrivacyStatement />);

    screen.getByRole('heading', {
        name: 'Privacyverklaring Mijn Gezondheidsoverzicht',
    });
});
