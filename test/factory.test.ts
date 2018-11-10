import mocha from 'mocha';
import sinon from 'sinon';
import {Arg} from './../src/models/arg';
import {expect, assert} from 'chai';
import {UsageFactory} from './../src/factory/UsageFactory';

describe('Usage Factory', () => {
    describe('argument', () => {
       it('test', () => {
        const usageFactory = new UsageFactory();
        const groupAddLineStub = sinon.stub(Array.prototype, "filter").returns(['-s', 'Description']);
        const argCreateFake = sinon.stub(Arg, 'create').callsFake((argsLine, descLine) => {
            return {
                args: argsLine,
                desc: descLine,
            };
        });

        const result = usageFactory.argument('-s  Description');
        // spyOn
        // called
        // returned
        groupAddLineStub.restore();
        argCreateFake.restore();
       });
    });
    describe('section', () => {

    });
    describe('usage', () => {

    });
});
