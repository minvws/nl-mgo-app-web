import { type UiElement as UiElementData } from '@minvws/mgo-fhir-data';
import { type FunctionComponent, type HTMLAttributes } from 'react';
import { DownloadLink } from './DownloadLink';
import { MultipleGroupedValues } from './MultipleGroupedValues';
import { MultipleValues } from './MultipleValues';
import { ReferenceLink } from './ReferenceLink';
import { ReferenceValue } from './ReferenceValue';
import { SingleValue } from './SingleValue';
import { DownloadBinary } from './DownloadBinary';

export interface UiElementProps extends HTMLAttributes<HTMLDivElement> {
    readonly element: UiElementData;
}

type UiElementMap = {
    [K in UiElementData['type']]: FunctionComponent<{
        readonly value: Extract<UiElementData, { type: K }>;
    }>;
};

const uiElement: UiElementMap = {
    SINGLE_VALUE: SingleValue,
    REFERENCE_LINK: ReferenceLink,
    REFERENCE_VALUE: ReferenceValue,
    MULTIPLE_VALUES: MultipleValues,
    MULTIPLE_GROUPED_VALUES: MultipleGroupedValues,
    DOWNLOAD_LINK: DownloadLink,
    DOWNLOAD_BINARY: DownloadBinary,
};

export function UiElement({ element }: UiElementProps) {
    const UiElement = uiElement[element.type] as FunctionComponent<{
        readonly value: typeof element;
    }>;

    if (!UiElement) {
        throw new Error(`Unknown UiElement type: ${element.type}`);
    }

    return <UiElement value={element} />;
}
