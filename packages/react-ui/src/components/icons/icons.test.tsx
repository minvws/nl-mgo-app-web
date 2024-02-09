import { render, screen } from '@testing-library/react';
import { ComponentType } from 'react';
import { expect, test } from 'vitest';
import * as icons from '.';

test.each(Object.entries(icons))(
    'renders icon `%s` with attributes',
    async (name: string, Icon: ComponentType) => {
        render(<Icon data-testid="test-icon" />);

        expect(await screen.findByTestId('test-icon')).toBeVisible();
    }
);
