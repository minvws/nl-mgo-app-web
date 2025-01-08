/* eslint-disable react/no-array-index-key */
import { type UiElement, type UiSchema } from '@minvws/mgo-fhir-data';
import { DescriptionList, Heading } from '@minvws/mgo-mgo-ui';
import { type FunctionComponent, type HTMLAttributes } from 'react';
import { DownloadLink } from './DownloadLink';
import { MultipleGroupValueDisplay } from './MultipleGroupValueDisplay';
import { MultipleValueDisplay } from './MultipleValueDisplay';
import { ReferenceValueDisplay } from './ReferenceValueDisplay';
import { SingleValueDisplay } from './SingleValueDisplay';
import { useFhirLabel } from './useFhirLabel';

export interface UiSchemaGroupProps extends HTMLAttributes<HTMLDivElement> {
    readonly group: UiSchema['children'][number];
}

type UiElementMap = {
    [K in UiElement['type']]: FunctionComponent<{
        readonly value: Extract<UiElement, { type: K }>;
    }>;
};

const uiEntryMap: Partial<UiElementMap> = {
    SINGLE_VALUE: SingleValueDisplay,
    REFERENCE_VALUE: ReferenceValueDisplay,
    MULTIPLE_VALUES: MultipleValueDisplay,
    MULTIPLE_GROUPED_VALUES: MultipleGroupValueDisplay,
    DOWNLOAD_LINK: DownloadLink,
};

export function UiSchemaGroup({ group: { label, children }, ...rest }: UiSchemaGroupProps) {
    return (
        <div {...rest}>
            <Heading asChild size="sm" className="mb-2 sm:mb-3">
                <h2>{useFhirLabel(label)}</h2>
            </Heading>

            <DescriptionList>
                {children.map((value, index) => {
                    const UiElement = uiEntryMap[value.type] as FunctionComponent<{
                        readonly value: typeof value;
                    }>;

                    if (!UiElement) {
                        throw new Error(`Unknown UiEntry type: ${value.type}`);
                    }

                    return <UiElement key={`${value.type}-${index}`} value={value} />;
                })}
            </DescriptionList>
        </div>
    );
}
