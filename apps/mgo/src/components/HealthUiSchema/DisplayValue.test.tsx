import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { PatientFriendlyTerm } from '$/services/pft/pftService';
import { faker } from '$test/faker';
import { DisplayValue as DisplayValueData } from '@minvws/mgo-hcim-ui';
import { DisplayValue } from './DisplayValue';

const mockDisplayCoding = (): DisplayValueData => ({
    code: faker.string.alphanumeric(8),
    display: faker.lorem.words(3),
    system: faker.internet.url(),
});

const mockPft: PatientFriendlyTerm = {
    description: faker.lorem.sentence(),
    synonym: faker.lorem.words(),
    name: faker.lorem.word(),
};

vi.mock('$/pft/usePft', () => ({
    usePft: ({ code, system }: { code?: string; system?: string } = {}) => {
        if (code === 'test-code-with-pft' && system === 'http://snomed.info/sct') {
            return { pft: mockPft, isLoading: false, isError: false };
        }
        return { pft: undefined, isLoading: false, isError: false };
    },
}));

test('renders nothing when value is undefined', () => {
    const { container } = setupWithAppProviders(<DisplayValue value={undefined} />);
    expect(container).toHaveTextContent('');
});

test('renders display text only when PFT is not available', () => {
    const displayCoding = mockDisplayCoding();

    setupWithAppProviders(<DisplayValue value={displayCoding} />);

    const displayText = screen.getByText(displayCoding.display as string);
    expect(displayText).toBeInTheDocument();

    const button = screen.queryByRole('button', { name: displayCoding.display });
    expect(button).not.toBeInTheDocument();
});

test('renders display text only when value has no code', () => {
    const displayValue = { display: faker.lorem.words(3) };

    setupWithAppProviders(<DisplayValue value={displayValue} />);

    const displayText = screen.getByText(displayValue.display as string);
    expect(displayText).toBeInTheDocument();

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
});

test('renders a button with Link dotted variant when PFT is available', () => {
    const displayCoding = {
        code: 'test-code-with-pft',
        system: 'http://snomed.info/sct',
        display: faker.lorem.words(3),
    };

    setupWithAppProviders(<DisplayValue value={displayCoding} />);

    const button = screen.getByRole('button', { name: displayCoding.display });
    expect(button).toBeInTheDocument();
});

test('opens ClosableCard when button is clicked and displays content', async () => {
    const displayCoding = {
        code: 'test-code-with-pft',
        system: 'http://snomed.info/sct',
        display: faker.lorem.words(3),
    };

    const { user } = setupWithAppProviders(<DisplayValue value={displayCoding} />);

    const button = screen.getByText(displayCoding.display as string);
    await user.click(button);

    const cardContent = await screen.findByText(mockPft.description, {}, { timeout: 3000 });
    expect(cardContent).toBeInTheDocument();
});

test('displays ClosableCard with synonym in title when opened', async () => {
    const displayCoding = {
        code: 'test-code-with-pft',
        system: 'http://snomed.info/sct',
        display: faker.lorem.words(3),
    };

    const { user } = setupWithAppProviders(<DisplayValue value={displayCoding} />);

    const button = screen.getByRole('button', { name: displayCoding.display });
    await user.click(button);

    const titleWithSynonym = await screen.findByText(mockPft.synonym, { exact: false });
    expect(titleWithSynonym).toBeInTheDocument();
});

test('renders ClosableCard with correct close button label', async () => {
    const displayCoding = {
        code: 'test-code-with-pft',
        system: 'http://snomed.info/sct',
        display: faker.lorem.words(3),
    };

    const { user } = setupWithAppProviders(<DisplayValue value={displayCoding} />);

    const openButton = screen.getByRole('button', { name: displayCoding.display });
    await user.click(openButton);

    await screen.findByText(mockPft.description, {}, { timeout: 3000 });

    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find((button) => button !== openButton);
    expect(closeButton).toBeInTheDocument();
});
