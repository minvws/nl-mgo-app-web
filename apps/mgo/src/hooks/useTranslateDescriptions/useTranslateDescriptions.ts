import { type MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { type ReactNode } from 'react';

type DescriptionItem = {
    term: MessageDescriptor;
    details: ReactNode;
};

export function useTranslateDescriptions() {
    const { _ } = useLingui();
    const unknownLabel = _(
        msg({
            id: 'common.unknown',
            message: 'Niet bekend',
        })
    );

    return {
        translateDescriptions: (items: DescriptionItem[]) =>
            items.map(({ term, details }) => ({
                term: _(term),
                details: details === undefined || details === null ? unknownLabel : details,
            })),
    };
}
