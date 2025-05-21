import { faker } from '$test/faker';
import { setup } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { StickyHeader } from './StickyHeader';

test('scrolls the header to the top when the menu opens', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn());
    const { rerender } = setup(<StickyHeader menuIsOpen={false} data-testid="sticky-header" />);

    const header = screen.getByTestId('sticky-header');
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({
        top: faker.number.int({ min: 1 }),
    } as DOMRect);

    expect(scrollTo).not.toHaveBeenCalled();
    rerender(<StickyHeader menuIsOpen data-testid="sticky-header" />);
    expect(scrollTo).toHaveBeenCalled();
});

test('does NOT attempt to scroll when the header is already at the top', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn());
    const { rerender } = setup(<StickyHeader menuIsOpen={false} data-testid="sticky-header" />);

    const header = screen.getByTestId('sticky-header');
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({
        top: 0,
    } as DOMRect);

    expect(scrollTo).not.toHaveBeenCalled();
    rerender(<StickyHeader menuIsOpen data-testid="sticky-header" />);
    expect(scrollTo).not.toHaveBeenCalled();
});
