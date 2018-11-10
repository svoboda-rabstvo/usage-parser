import * as fs from 'fs';
import mocha from 'mocha';
import { expect, assert } from 'chai';
import {convert} from './../src/temp/convert';
import {Client} from './../src/client';

const data = require('./data.json');

describe('Integration', () => {
    // tslint:disable-next-line:no-any
    data.tests.map((test: any) => {
        it(test.description, () => {
            const usageText = fs.readFileSync(test.data.doc).toString();
            const testResult = JSON.stringify(JSON.parse(fs.readFileSync(test.data.result).toString()), null, 4);
            const parseResult = JSON.stringify(convert(new Client(usageText).create()), null, 4);

            test.valid ?
                assert.equal(parseResult, testResult) :
                assert.notEqual(parseResult, testResult);
        });
    });
});
