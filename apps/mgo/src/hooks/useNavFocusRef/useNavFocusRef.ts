import { useEffect, useRef } from 'react';

let userHasInteracted = false;

/**
 * Use this hook to move focus on render to respond to user-initiated virtual
 * "navigation", such as client-side routing or opening a dialog.
 *
 * To use it, apply the `ref` returned by this hook to the element that should
 * receive focus after "navigation" (i.e. on render). Focus is only moved if
 * the user has interacted with the app.
 *
 * NB: the target element must be an element that won't be replaced during the
 * lifecycle of the page, to avoid moving focus after the initial "navigation".
 *
 * @example
 * const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
 * return <main><h1 ref={navFocusRef}>Some page</h1><p>...</p></main>;
 *
 * @param {unknown} [key] - Optional key, can be used if the target element is
 *    not re-rendered between "navigation"s. E.g. use the current `location` as
 *    key if the element is shared by multiple routes.
 */
export function useNavFocusRef<T extends Element>(key?: unknown) {
    const ref = useRef<T>(null);
    useEffect(() => {
        if (
            userHasInteracted &&
            isFocusable(ref.current) &&
            document.activeElement !== ref.current
        ) {
            focusElement(ref.current);
        }
    }, [key]);
    return ref;
}

function isFocusable(element: Element | null): element is HTMLElement | SVGElement | MathMLElement {
    return element instanceof HTMLElement || element instanceof SVGElement;
}

function focusElement(element: HTMLElement | SVGElement | MathMLElement) {
    if (element.tabIndex < 0 && !element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
        element.classList.add('outline-none');
    }
    element.focus();
}

function setUserHasInteracted() {
    userHasInteracted = true;
}

window.addEventListener('focus', setUserHasInteracted, { capture: true, once: true });
