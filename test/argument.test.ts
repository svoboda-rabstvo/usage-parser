import mocha from 'mocha';
import { expect, assert } from 'chai';
import Arg from './../src/models/arg';
import ArgType from './../src/types/argTypes';

describe('Arguments', () => {
    describe('names', () => {
        //TODO: на каждое ветвление создать отдельный тест: coverage tests
        it('one by one', () => {
            // метод create: протестировать на trimEnd true and false:
            const input = '--arg, -i';
            const argument = Arg.create(input);
            assert.equal(argument.longName, '--arg');
            assert.equal(argument.shortName, '-i');
        });
        it('in description', () => {
            const input = '-i, --arg-filter [String]   description test --some';
            const argument = Arg.create(input);
            assert.equal(argument.longName, '--arg-filter');
        });
    });

    describe('values', () => {
        it('one', () => {
            const input = '[one]';
            const argument = Arg.create(input);
            assert.equal(argument.values, undefined);
        });
        it('many', () => {
            const input = '<one|two|three>';
            const argument = Arg.create(input);
            assert.deepEqual(argument.values, [
                'one',
                'two',
                'three'
            ]);
        });
        it('full', () => {
            const input = '-i   Description <one|2 or false, four]';
            const argument = Arg.create(input);
            assert.deepEqual(argument.values, [
                'one',
                '2',
                'false',
                'four'
            ]);
        });
    });

    describe('default', () => {
        it('string', () => {
            const input = '[default: .js]';
            const argument = Arg.create(input);
            assert.equal(argument.default, '.js');
        });
        it('number', () => {
            const input = 'Defaults to 2.';
            const argument = Arg.create(input);
            assert.equal(argument.default, '2');
        });
        it('boolean', () => {
            const input = '(default is \'false")';
            const argument = Arg.create(input);
            assert.equal(argument.default, 'false');
        });
        it('full', () => {
            const input = '--arg    Description default to never';
            const argument = Arg.create(input);
            assert.equal(argument.default, 'never');
        });
    });

    describe('description', () => {
        it('unify', () => {
            const input = '--arg   description.        ';
            const argument = Arg.create(input);
            assert.equal(argument.description, 'Description');
        });
    });

    describe('type', () => {
        it('by default as string', () => {
            const input = 'default to .js';
            const argument = Arg.create(input);
            assert.equal(argument.type, ArgType.string);
        });
        it('by default as number', () => {
            const input = 'default to 2';
            const argument = Arg.create(input);
            assert.equal(argument.type, ArgType.number);
        });
        it('by values', () => {
            const input = '<one|two|three>';
            const argument = Arg.create(input);
            assert.equal(argument.type, ArgType.string);
        });
        it('by property', () => {
            const input = '--arg [int]   Description';
            const argument = Arg.create(input);
            assert.equal(argument.type, ArgType.number);
        });
    });

    describe('flag', () => {
        it('type boolean', () => {
            const input = '--arg [int]   Description default to false';
            const argument = Arg.create(input);
            assert.equal(argument.hasValue, true);
        });
        it('type undefined', () => {
            const input = '--arg  Description';
            const argument = Arg.create(input);
            assert.equal(argument.hasValue, true);
        });
    });

    describe('delimiter', () => {
        it('space', () => {
            const input = '--arg String';
            const argument = Arg.create(input);
            assert.equal(argument.delimiter, ' ');
        });
        it('sign', () => {
            const input = '--arg=String';
            const argument = Arg.create(input);
            assert.equal(argument.delimiter, '=');
        });
    });

    describe('deprecated', () => {
        it('exist', () => {
            const input = '[deprecated]';
            const argument = Arg.create(input);
            assert.equal(argument.deprecated, true);
        });
        it('uppercase', () => {
            const input = '(DEPRECATED)';
            const argument = Arg.create(input);
            assert.equal(argument.deprecated, true);
        });
    });

    describe('required', () => {
        it('exist', () => {
            const input ='--arg *required*';
            const argument = Arg.create(input);
            assert.equal(argument.required, true);
        });
    });

    describe('full', () => {
        const input = '--arg, -i *required* [int]    description default to 8, <one|two|three|four> DePReCATeD .           ';
        const argument = Arg.create(input);

        it('type', () => { assert.equal(argument.type, ArgType.string); });
        it('values', () => { assert.deepEqual(argument.values, ['one', 'two','three','four']); });
        it('default', () => { assert.equal(argument.default, '8'); });
        it('required', () => { assert.equal(argument.required, true); });
        it('delimiter', () => { assert.equal(argument.delimiter, ' '); });
        it('long name', () => { assert.equal(argument.longName, '--arg'); });
        it('short name', () => { assert.equal(argument.shortName, '-i'); });
        it('deprecated', () => { assert.equal(argument.deprecated, true); });
        it('has values', () => { assert.equal(argument.hasValue, undefined); });
        it('description', () => { assert.equal(argument.description, 'Description default to 8, <one|two|three|four> DePReCATeD'); });
    });
});
