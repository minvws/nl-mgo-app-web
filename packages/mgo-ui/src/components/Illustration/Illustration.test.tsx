import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Illustration } from './Illustration';
import { illustrationNames } from './illustrations';

test('renders illustration', async () => {
    render(
        <Illustration
            data-testid="test-illustration"
            illustration={faker.helpers.arrayElement(illustrationNames)}
        />
    );

    screen.getByTestId('test-illustration');
});
