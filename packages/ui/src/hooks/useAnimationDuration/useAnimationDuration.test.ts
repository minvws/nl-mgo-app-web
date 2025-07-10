import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useConfig } from '../useConfig/useConfig';
import { useAnimationDuration } from './useAnimationDuration';

test('returns animation duration when animations are enabled', async () => {
    useConfig().animations = true;

    const duration = faker.number.int({ min: 100 });
    const { result } = renderHook(() => useAnimationDuration(duration));
    expect(result.current).toBe(duration);
});

test('returns 0 for animation duration when animations are disabled', async () => {
    useConfig().animations = false;

    const duration = faker.number.int({ min: 100 });
    const { result } = renderHook(() => useAnimationDuration(duration));
    expect(result.current).toBe(0);
});
