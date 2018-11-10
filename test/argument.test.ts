import mocha from 'mocha';
import { expect, assert } from 'chai';
import {Arg} from './../src/models/arg';
import {ArgType} from './../src/types/argTypes';
import * as sinon from 'sinon';


describe('Arguments', () => {
    it('names', () => {
        const argsLine = '--arg, -i';
        const argument = new Arg(argsLine, String.Empty);
        assert.equal(argument.longName, '--arg');
        assert.equal(argument.shortName, '-i');
    });

    describe('values', () => {
        it('many values', () => {
            const descLine = 'Description <one|2 or false, four]';
            const argument = new Arg(String.Empty, descLine);
            assert.deepEqual(argument.values, [
                'one',
                '2',
                'false',
                'four'
            ]);
        });
        it('undefined', () => {
            const descLine = '[one]';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.values, undefined);
        });
    });

    describe('default', () => {
        it('string', () => {
            const descLine = '[default: .js]';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.default, '.js');
        });
        it('number', () => {
            const descLine = 'Defaults to 2';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.default, '2');
        });
        it('boolean', () => {
            const descLine = '(default is \'false")';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.default, 'false');
        });
        it('undefined', () => {
            const descLine = 'Description';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.default, undefined);
        });
    });

    describe('required', () => {
        it('true', () => {
            const argsLine ='--arg *required*';
            const argument = new Arg(argsLine, String.Empty);
            assert.equal(argument.required, true);
        });
        it('undefined', () => {
            const argsLine ='--arg';
            const argument = new Arg(argsLine, String.Empty);
            assert.equal(argument.required, undefined);
        });
    });

    describe('delimiter', () => {
        it('equal sign', () => {
            const argsLine = '--arg=String';
            const argument = new Arg(argsLine, String.Empty);
            assert.equal(argument.delimiter, '=');
        });
        it('undefined', () => {
            const argsLine = '--arg';
            const argument = new Arg(argsLine, String.Empty);
            assert.equal(argument.delimiter, undefined);
        });
    });

    describe('deprecated', () => {
        it('true', () => {
            const descLine = '[deprecated]';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.deprecated, true);
        });
        it('undefined', () => {
            const descLine = 'Description';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.deprecated, undefined);
        });
    });

    describe('type', () => {
        it('string', () => {
            const descLine = 'default to .js';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.string);
        });
        it('number', () => {
            const descLine = 'default to 2';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.number);
        });
        it('boolean', () => {
            const descLine = 'default to true';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.boolean);
        });
        it('object', () => {
            const descLine = 'default to Object';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.object);
        });
        it('array', () => {
            const descLine = 'default to Array';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.array);
        });
        it('string if argument has values', () => {
            const descLine = '<one|two|three>';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.string);
        });
        it('undefined', () => {
            const descLine = 'default to';
            const argument = new Arg(String.Empty, descLine);
            assert.equal(argument.type, ArgType.undefined);
        });
    });

    describe('flag', () => {
        it('if type boolean', () => {
            const argsLine = '--arg [int]';
            const descLine = 'Description default to false';
            const argument = new Arg(argsLine, descLine);
            assert.equal(argument.hasValue, true);
        });
        it('if type undefined', () => {
            const argsLine = '--arg';
            const argument = new Arg(argsLine, String.Empty);
            assert.equal(argument.hasValue, true);
        });
        it('undefined', () => {
            const argsLine = '--arg [int]';
            const argument = new Arg(argsLine, String.Empty);
            assert.equal(argument.hasValue, undefined);
        });
    });

    describe('full', () => {
        const argsLine = '--arg, -i *required* [int]';
        const descLine = 'description default to 8, <one|two|three|four> DePReCATeD.';
        const argument = new Arg(argsLine, descLine);

        it('type', () => { assert.equal(argument.type, ArgType.string); });
        it('values', () => { assert.deepEqual(argument.values, ['one', 'two','three','four']); });
        it('default', () => { assert.equal(argument.default, '8'); });
        it('required', () => { assert.equal(argument.required, true); });
        it('delimiter', () => { assert.equal(argument.delimiter, ' '); });
        it('long name', () => { assert.equal(argument.longName, '--arg'); });
        it('short name', () => { assert.equal(argument.shortName, '-i'); });
        it('deprecated', () => { assert.equal(argument.deprecated, true); });
        it('has values', () => { assert.equal(argument.hasValue, undefined); });
        it('description', () => { assert.equal(argument.description, 'description default to 8, <one|two|three|four> DePReCATeD.'); });
    });
});
