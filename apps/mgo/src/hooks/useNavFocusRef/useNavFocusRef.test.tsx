import React, { useMemo, useState, type RefObject, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';
import { type useNavFocusRef as useNavFocusRefType } from './useNavFocusRef';

let useNavFocusRef: typeof useNavFocusRefType;

beforeEach(async () => {
    vi.resetModules();
    useNavFocusRef = (await import('./useNavFocusRef')).useNavFocusRef;
});

type TestPage = React.FC<{ label: string }>;

// These components are implemented identically, but distinct from React's
// perspective so they each have their own hook and get their own ref.
const TestPageA = makeTestPage<HTMLHeadingElement>((ref, label) => <h1 ref={ref}>{label}</h1>);
const TestPageB = makeTestPage<HTMLHeadingElement>((ref, label) => <h1 ref={ref}>{label}</h1>);

function TestApp({
    overrideView,
    A = TestPageA,
    B = TestPageB,
}: {
    readonly overrideView?: 'a' | 'b';
    readonly A?: TestPage;
    readonly B?: TestPage;
}) {
    const [stateView, toggleView] = useView();
    const view = overrideView ?? stateView;
    return (
        <>
            {view === 'a' ? <A label="view a" /> : <B label="view b" />}
            <button onClick={toggleView}>toggle view</button>
        </>
    );
}

test.each<[string, TestPage]>([
    [
        '<a>',
        makeTestPage<HTMLAnchorElement>((ref, label) => (
            <a href="#" ref={ref}>
                {label}
            </a>
        )),
    ],
    [
        '<button>',
        makeTestPage<HTMLButtonElement>((ref, label) => <button ref={ref}>{label}</button>),
    ],
    ['<div>', makeTestPage<HTMLDivElement>((ref, label) => <div ref={ref}>{label}</div>)],
    ['<span>', makeTestPage<HTMLSpanElement>((ref, label) => <span ref={ref}>{label}</span>)],
    ['<h1>', makeTestPage<HTMLHeadingElement>((ref, label) => <h1 ref={ref}>{label}</h1>)],
    [
        '<input>',
        makeTestPage<HTMLInputElement>((ref, label) => {
            const id = useMemo(() => `input-${btoa(Math.random().toString()).slice(0, 5)}`, []);
            return (
                <>
                    <label htmlFor={id}>{label}</label>
                    <input id={id} ref={ref} />
                </>
            );
        }),
    ],
    [
        '<select>',
        makeTestPage<HTMLSelectElement>((ref, label) => {
            const id = useMemo(() => `input-${btoa(Math.random().toString()).slice(0, 5)}`, []);
            return (
                <>
                    <label htmlFor={id}>{label}</label>
                    <select id={id} ref={ref}>
                        <option value="it-depends">It depends</option>
                    </select>
                </>
            );
        }),
    ],
    [
        '<div contenteditable="true">',
        makeTestPage<HTMLDivElement>((ref, label) => (
            <div ref={ref} contentEditable="true" aria-label={label}></div>
        )),
    ],
    [
        '<div contenteditable="false">',
        makeTestPage<HTMLDivElement>((ref, label) => (
            <div ref={ref} contentEditable="false" aria-label={label}></div>
        )),
    ],
    [
        '<svg>',
        makeTestPage<SVGSVGElement>((ref, label) => (
            <svg ref={ref} role="img" aria-label={label}></svg>
        )),
    ],
])('moves focus to %s after user-initiated navigation', async (_name, Component) => {
    const user = userEvent.setup();
    render(<TestApp B={Component} />);

    await user.click(screen.getByText('toggle view'));

    const element = screen.queryByLabelText('view b') ?? screen.queryByText('view b');
    expect(element).toBeInTheDocument();
    expect(document.activeElement).toBe(element);
});

test('does not move focus on initial render', () => {
    const activeElement = document.activeElement;
    render(<TestApp />);

    expect(document.activeElement).toBe(activeElement);
});

test('does not move focus on programmatic navigation if user has not moved focus yet', () => {
    const activeElement = document.activeElement;
    const { rerender } = render(<TestApp overrideView="a" />);

    rerender(<TestApp overrideView="b" />);

    expect(screen.getByText('view b')).toBeInTheDocument();
    expect(document.activeElement).toBe(activeElement);
});

test('moves focus after programmatic navigation if user already interacted', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TestApp overrideView="a" />);

    await user.keyboard('{Tab}');
    rerender(<TestApp overrideView="b" />);

    expect(document.activeElement).toBe(screen.getByText('view b'));
});

test('changes tabindex to -1 if necessary', async () => {
    const user = userEvent.setup();
    render(
        <TestApp
            B={makeTestPage<HTMLButtonElement>((ref, label) => (
                <span ref={ref}>{label}</span>
            ))}
        />
    );

    await user.click(screen.getByText('toggle view'));

    const element = screen.queryByText('view b');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('tabindex', '-1');
});

test('does not change tabindex unnecessarily (implicit tabindex)', async () => {
    const user = userEvent.setup();
    render(
        <TestApp
            B={makeTestPage<HTMLButtonElement>((ref, label) => (
                <button ref={ref}>{label}</button>
            ))}
        />
    );

    await user.click(screen.getByText('toggle view'));

    const element = screen.queryByText('view b');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveAttribute('tabindex');
});

test('does not change tabindex unnecessarily (explicit tabindex)', async () => {
    const user = userEvent.setup();
    render(
        <TestApp
            B={makeTestPage<HTMLSpanElement>((ref, label) => (
                <span tabIndex={2} ref={ref}>
                    {label}
                </span>
            ))}
        />
    );

    await user.click(screen.getByText('toggle view'));

    const element = screen.queryByText('view b');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('tabindex', '2');
});

function KeyedTestApp({
    overrideView,
    useKey = true,
}: {
    readonly overrideView?: 'a' | 'b';
    readonly useKey?: boolean;
}) {
    const [stateView, toggleView] = useView();
    const [count, setCount] = useState(0);
    const increment = () => setCount((val) => val + 1);
    const view = overrideView ?? stateView;
    const ref = useNavFocusRef<HTMLHeadingElement>(useKey ? view : undefined);
    return (
        <>
            <h1 ref={ref}>view {view}</h1>
            <span>count {count}</span>
            <button onClick={increment}>increment</button>
            <button onClick={toggleView}>toggle view</button>
        </>
    );
}

test('does not move focus when view updates', async () => {
    const user = userEvent.setup();
    render(<KeyedTestApp />);

    const incrementButton = screen.getByText('increment');
    await user.click(incrementButton);

    expect(document.activeElement).toBe(incrementButton);
});

test('moves focus when target element is reused but `key` updates', async () => {
    const user = userEvent.setup();
    render(<KeyedTestApp />);

    await user.click(screen.getByText('toggle view'));

    expect(document.activeElement).toBe(screen.getByText('view b'));
});

test('does not move focus when target element is reused and `key` is not used', async () => {
    const user = userEvent.setup();
    render(<KeyedTestApp useKey={false} />);

    const toggleViewButton = screen.getByText('toggle view');
    await user.click(toggleViewButton);

    expect(document.activeElement).toBe(toggleViewButton);
});

function makeTestPage<T extends Element>(
    fn: (ref: RefObject<T>, label: string) => ReactNode
): TestPage {
    return function TestPageComp({ label }: { readonly label: string }) {
        const ref = useNavFocusRef<T>();
        return (
            <section>
                {fn(ref, label)}
                <p>Some section</p>
            </section>
        );
    };
}

function useView(): ['a' | 'b', () => void] {
    const [view, setView] = useState<'a' | 'b'>('a');
    const toggle = () => setView((current) => (current === 'a' ? 'b' : 'a'));
    return [view, toggle];
}
