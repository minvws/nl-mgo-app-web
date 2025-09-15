import { HealthUiSchema } from '@minvws/mgo-hcim';
import { StyleSheet, Text, View, type ViewProps } from '@react-pdf/renderer';
import { HealthUiSchemaTable } from './HealthUiSchemaTable';
import { pxToPt } from './pxToPt';
import { Table } from './Table';
import { Style } from './types';

const styles = StyleSheet.create({
    heading: {
        fontSize: pxToPt(16),
        fontWeight: 'bold',
        marginBottom: pxToPt(16),
    },
});

export interface SubCategoryProps extends ViewProps {
    readonly style?: Style;
    readonly heading: string;
    readonly schemas: HealthUiSchema[];
    readonly noDataMessage: string;
}

export const SubCategory = ({ heading, schemas, noDataMessage, ...rest }: SubCategoryProps) => {
    return (
        <View {...rest}>
            <Text style={styles.heading} data-testid="subcategory-heading">
                {heading}
            </Text>

            {schemas.length ? (
                schemas.map((schema, index) => (
                    <HealthUiSchemaTable
                        key={index} // eslint-disable-line react/no-array-index-key
                        schema={schema}
                        style={{ marginBottom: pxToPt(16) }}
                    />
                ))
            ) : (
                <Table>
                    <Table.Row>
                        <Table.Col>
                            <Table.Cell>{noDataMessage}</Table.Cell>
                        </Table.Col>
                    </Table.Row>
                </Table>
            )}
        </View>
    );
};
