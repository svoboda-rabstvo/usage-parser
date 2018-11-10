import mocha from 'mocha';
import { expect, assert } from 'chai';
import {Group} from './../src/models/group';

describe('Group', () => {
    describe('lines', () => {
        it('empty', () => {
            const group = new Group(undefined);
            assert.equal(group.lines.length, 0);
        });

        it('one line', () => {
            const line = '-a  Description';
            const group = new Group(undefined).addLine(line);
            assert.equal(group.lines[0], line);
        });
        it('line consist a lot of parts', () => {
            const lines = [
                '-a  Description',
                'Description part 2',
                'Description part 3'
            ];

            const group = new Group(undefined);
            lines.forEach((line) => group.addLine(line));
            assert.equal(group.lines[0], '-a  Description  Description part 2  Description part 3');
        });
    });
});
