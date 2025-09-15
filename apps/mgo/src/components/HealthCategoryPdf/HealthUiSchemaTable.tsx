import { HealthUiSchema } from '@minvws/mgo-hcim';
import { StyleSheet, Text } from '@react-pdf/renderer';
import { HealthUiGroup } from './HealthUiGroup';
import { Table } from './Table';
import { pxToPt } from './pxToPt';
import { Style } from './types';

const styles = StyleSheet.create({
    tableHeader: {
        fontSize: pxToPt(12),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export interface HealthUiSchemaTableProps {
    readonly style?: Style;
    readonly schema: HealthUiSchema;
}

export const HealthUiSchemaTable = ({
    style,
    schema: { label, children },
}: HealthUiSchemaTableProps) => {
    return (
        <Table style={style} data-testid="health-ui-schema-table">
            <Table.Row>
                <Table.Col>
                    <Text style={styles.tableHeader} data-testid="schema-label">
                        {label}
                    </Text>
                </Table.Col>
            </Table.Row>

            {children.map((group, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <HealthUiGroup key={index} group={group} />
            ))}
        </Table>
    );
};
