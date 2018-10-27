import mocha from 'mocha';
import { expect, assert } from 'chai';
import Section from './../src/models/section';
import Arg  from './../src/models/arg';

describe('Section', () => {
    const lines = [
        '-i  Description',
        '--a-arg  Description'
    ];

    describe('with name', () => {
        const name = 'Options';
        const section = Section.create(name, lines);

        it('name', () => { assert.equal(section.name, name); });
        it('args', () => {
            assert.deepEqual(section.args, [
                Arg.create(lines[0]),
                Arg.create(lines[1]),
            ]);
        });
    });

    describe('without name', () => {
        const section = Section.create(undefined, lines);

        it('name', () => { assert.equal(section.name, undefined); });
        it('args', () => {
            assert.deepEqual(section.args, [
                Arg.create(lines[0]),
                Arg.create(lines[1]),
            ]);
        });
    });
});
