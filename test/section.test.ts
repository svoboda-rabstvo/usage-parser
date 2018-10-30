import mocha from 'mocha';
import { expect, assert } from 'chai';
import Section from './../src/models/section';

describe('Section', () => {
    describe('name', () => {
        const lines = [
            '-i  Description',
            '--a-arg  Description'
        ];
        it('exist', () => {
            const name = 'Options';
            const section = Section.create(name, lines);
            assert.equal(section.name, name);
        });
        it('undefined', () => {
            const section = Section.create(undefined, lines);
            assert.equal(section.name, undefined);
        });
    });

    describe('arguments', () => {
        it('exist', () => {
            const lines = [
                '-i  Description',
            ];
            const section = Section.create(undefined, lines);
            assert.deepEqual(section.args.length, 1);
        });
        it('undefined', () => {
            const lines = [
                'Description',
            ];
            const section = Section.create(undefined, lines);
            assert.deepEqual(section.args.length, 0);
        });
    });
});
