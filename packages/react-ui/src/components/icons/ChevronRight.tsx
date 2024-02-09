/* Copyright Dutch Ministry of General Affairs
 * SPDX-License-Identifier: LicenseRef-Rijkshuisstijl
 */

import { HTMLAttributes } from 'react';

export const ChevronRight = (props: HTMLAttributes<SVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="21" fill="none" {...props}>
        <path
            fill="currentColor"
            d="m.31 19.7 7.74-9.06-7.68-9.1L1.46.58l8.6 10.05-8.58 10.04c-.4-.32-.78-.65-1.17-.98Z"
        />
    </svg>
);
