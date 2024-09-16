import { expectJson } from '$test';
import { test } from 'vitest';
import { type Condition } from '../../fhir';
import input from './fixtures/zib-Problem-01.json';
import { zibProblem } from './zibProblem';

const zibData = zibProblem.parse(input as Condition);

test('uiSchema returns the expected output', () => {
    const uiSchema = zibProblem.uiSchema(zibData);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-Problem-01-uiSchema.snap.json');
});
