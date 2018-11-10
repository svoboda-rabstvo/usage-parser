import {config} from './../config';
import { ArgType, indetifyType } from '../types/argTypes';
import './../extensions/string';

/** Argument object of usage's doc */
export class Arg {
    /**
     * The full name of the argument
     * @type {?string | undefined}
     */
    longName?: string | undefined;

    /**
     * The short name of the argument
     * @type {?string | undefined}
     */
    shortName?: string | undefined;

    /**
     * The description of the argument
     * @type {?string | undefined}
     */
    description? : string | undefined;

    /**
     * The type of argument
     * @type {ArgType | undefined}
     */
    type: ArgType | undefined;

    /**
     * The possible values of argument
     * @type {?string[] | undefined}
     */
    values?: string[] | undefined;

    /**
     * The default value of argument
     * @type {?string | undefined}
     */
    default?: string | undefined;

    /**
     * The argument is required
     * @type {?boolean | undefined}
     */
    required?: boolean | undefined;

    /**
     * The argument has value
     * @type {?boolean | undefined}
     */
    hasValue?: boolean | undefined;

    /**
     * The delimiter of argument
     * @type {?string | undefined}
     */
    delimiter?: string | undefined;

    /**
     * The argument has deprecated
     * @type {?boolean | undefined}
     */
    deprecated?: boolean | undefined;

    /**
     * @constructor
     * @param {string | undefined} argsLine - The line which include anything but description
     * @param {string } descLine - The line which include only description
     */
    constructor(argsLine: string | undefined, descLine: string) {
        this.longName = config.reg.arg.long.firstMatch(argsLine);
        this.shortName = config.reg.arg.short.firstMatch(argsLine);
        this.description = descLine;

        this.values = this.getValues(argsLine, descLine, config.reg.enums.values);
        this.default = config.reg.default.firstMatch(descLine);
        this.required = config.reg.required.firstMatch(argsLine) ? true : undefined;
        this.delimiter = config.reg.delimiter.firstMatch(argsLine);
        this.deprecated = config.reg.deprecated.firstMatch(descLine) ? true : undefined;

        this.type = this.getType(argsLine);
        this.hasValue = (this.type === ArgType.undefined || this.type === ArgType.boolean) ? true : undefined;
    }


    /**
     * Try to identify ArgType from line, which include argument names
     * @param {string | undefined} argsLine - The line which include argument names
     * @return {ArgType} - The ArgType of argument
     */
    private getType(argsLine: string | undefined) : ArgType {
        if (this.values !== undefined) return ArgType.string;
        const typeOfDefault = indetifyType(this.default);
        const typeOfArgument = typeOfDefault === ArgType.undefined ?
            indetifyType(this.default ? typeof this.default.convert() : argsLine)
            : typeOfDefault;

        return typeOfArgument;
    }

    /**
     * Get values of arguments by origin string and return it in array strings
     * @param {string | undefined} line - The string with argument and description
     * @param {string} reg - The string for RegExp which can be identify possible values of argument. Should be save only first match
     * @return {string[] | undefined} - The array strings or undefined. Undefined if values cannot identify
     */
    private getValues(
        argsLine: string | undefined,
        descLine: string,
        reg: string
    ) : string[] | undefined {
        const fullLine = (argsLine ? argsLine : String.Empty) + config.reg.tabulation + descLine;
        const valuesLine = reg.firstMatch(fullLine);
        const valuesArray = valuesLine ? valuesLine
            .split(config.reg.enums.split)
            .filter((x) => x !== String.Empty) : undefined;
        return valuesArray;
    }

    /**
     * Create Arg with properties
     * @param {string | undefined} argsLine - The line which include anything but description
     * @param {string} descLine - The line which include only description
     * @return {Arg} - The Arg
     */
    static create(argsLine: string | undefined, descLine: string) {
        return new Arg(argsLine, descLine);
    }
}
