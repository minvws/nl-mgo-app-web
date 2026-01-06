import { faker } from '@faker-js/faker';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { ErrorNotice, ErrorNoticeProps } from './ErrorNotice';

test('shows ErrorNotice when it has error state', () => {
    const props: ErrorNoticeProps = {
        heading: faker.lorem.word(),
        subHeading: faker.lorem.word(),
        buttonLabel: faker.lorem.word(),
        onClick: vi.fn(),
        isOpen: true,
    };

    render(<ErrorNotice {...props} />);

    expect(screen.getByText(props.heading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(props.buttonLabel);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
});

test('shows ErrorNotice with spinner when it has loading state', () => {
    const props: ErrorNoticeProps = {
        heading: faker.lorem.word(),
        subHeading: faker.lorem.word(),
        buttonLabel: faker.lorem.word(),
        onClick: vi.fn(),
        isOpen: true,
        loading: true,
        loadingTextScreenReader: faker.lorem.word(),
    };

    render(<ErrorNotice {...props} />);

    expect(screen.getByText(props.heading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(props.buttonLabel);
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
});

test('calls onClick when button is clicked', () => {
    const onClick = vi.fn();

    const props: ErrorNoticeProps = {
        heading: faker.lorem.word(),
        subHeading: faker.lorem.word(),
        buttonLabel: faker.lorem.word(),
        onClick,
        isOpen: true,
    };

    render(<ErrorNotice {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
});
