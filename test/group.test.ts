import mocha from 'mocha';
import { expect, assert } from 'chai';
import Group from './../src/models/group';
import config from './../src/config';

describe('Group', () => {
    describe('name', () => {
        it('exist', () => {
            const name = 'Options';
            assert.equal(new Group(name).name, name);
        });
        it('default', () => {
            assert.equal(new Group().name, undefined);
        });
    });

    describe('lines', () => {
        it('empty', () => {
            const group = new Group();
            assert.equal(group.lines.length, 0);
        });

        it('one line', () => {
            const line = '-a  Description';
            const group = new Group().addLine(line);
            assert.equal(group.lines[0], line);
        });
        it('line consist a lot of parts', () => {
            const lines = [
                '-a  Description',
                'Description part 2',
                'Description part 3'
            ];

            const group = new Group();
            lines.forEach((line) => group.addLine(line));
            assert.equal(group.lines[0], '-a  Description  Description part 2  Description part 3');
        });

        it('with custom join char', () => {
            const lines = [
                '-a  Description',
                'Description part 2',
                'Description part 3',
            ];
            const joinChar = '_ABC_';
            const identity =  config.reg.arg.start;

            const group = new Group();
            lines.forEach((line) => group.addLine(line, identity, joinChar));
            assert.equal(group.lines[0], lines.join(joinChar));
        });

        it('with custom identity', () => {
            const lines = [
                '-a  @ Description',
                'Description part 2',
                '@ Description part 3',
            ];
            const identity =  '@';

            const group = new Group();
            lines.forEach((line) => group.addLine(line, identity));
            assert.equal(group.lines[0], '-a  @ Description  Description part 2');
            assert.equal(group.lines[1], '@ Description part 3');
        });

        it('full', () => {
            const lines = [
                '@ -a  Description',
                'Description part 2',
                'Description part 3',
                '-b  @ Description',
            ];
            const identity =  '@';
            const joinChar = '___';

            const group = new Group();
            lines.forEach((line) => group.addLine(line, identity, joinChar));
            assert.equal(group.lines.length, 2);
            assert.equal(group.lines[0], '@ -a  Description___Description part 2___Description part 3');
            assert.equal(group.lines[1], '-b  @ Description');
        });
    });
});
