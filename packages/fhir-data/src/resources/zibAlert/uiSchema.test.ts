import { expectJson } from '$test';
import { test } from 'vitest';
import { type Flag } from '../../fhir';
import input from './fixtures/zib-Alert-01.json';
import { zibAlert } from './zibAlert';

const zibData = zibAlert.parse(input as Flag);

test('uiSchema returns the expected output', () => {
    const uiSchema = zibAlert.uiSchema(zibData);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-Alert-01-uiSchema.snap.json');
});
