import { type HealthUiGroup as HealthUiGroupData } from '@minvws/mgo-hcim-ui';
import { Table } from './Table';
import { getTableValue } from './getTableValue';
import { pxToPt } from './pxToPt';

export interface HealthUiGroupProps {
    readonly group: HealthUiGroupData;
}

export const HealthUiGroup = ({ group: { label, children } }: HealthUiGroupProps) => {
    return (
        <>
            {label && (
                <Table.Row>
                    <Table.Col>
                        <Table.Cell
                            data-testid="group-label"
                            style={{ fontWeight: 'bold', fontSize: pxToPt(12) }}
                        >
                            {label}
                        </Table.Cell>
                    </Table.Col>
                </Table.Row>
            )}

            {children.map(getTableValue).map(({ label, value }, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Table.Row key={index}>
                    <Table.Col variant="dark">
                        <Table.Cell data-testid="element-label">{label}</Table.Cell>
                    </Table.Col>
                    <Table.Col>
                        <Table.Cell data-testid="element-value">{value}</Table.Cell>
                    </Table.Col>
                </Table.Row>
            ))}
        </>
    );
};
