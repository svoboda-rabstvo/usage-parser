import mocha from 'mocha';
import { expect, assert } from 'chai';
import Usage from './../src/models/usage';

describe('Usage', () => {
    describe('Section', () => {
        const input =
            `Options:
            -i  Description
            --a-arg  Description`;
        it('one section', () => {
            const usage = Usage.create(input);
            assert.equal(usage.sections ? usage.sections.length : 0, 1);
            assert.equal(usage.sections ? usage.sections[0].name : null, 'Options');
        });

        it('many section', () => {
            const usage = Usage.create(input + "\n" + input + "\n" + input);
            assert.equal(usage.sections ? usage.sections.length : 0, 3);
            assert.deepEqual(usage.sections ? usage.sections.map((section) => section.name) : [], [
                'Options',
                'Options',
                'Options'
            ]);
        });

        it('blocked section', () => {
            const blockedSection =
                `Example
                -i  Description`;
            const usage = Usage.create(input + '\n' + blockedSection);
            assert.equal(usage.sections ? usage.sections.length : 0, 1);
        });

        it('without section', () => {
            const input =
                `-i  Description
                --a-arg  Description`;
            const usage = Usage.create(input);
            assert.equal(usage.sections ? usage.sections.length : 0, 1);
            assert.equal(usage.sections ? usage.sections[0].name : null, undefined);
        });
    });

    describe('Lines', () => {
        it('Multiline description', () => {
            const input =
                `-i  Description
                cont. description of i arg
                cont. description of i arg part 2`;
            const usage = Usage.create(input);
            assert.equal(usage.sections![0].args![0].description, 'Description cont. description of i arg cont. description of i arg part 2');
        });
    });
});

/*
1. Поправить сначала код
2. Добавить тесты все



*/
