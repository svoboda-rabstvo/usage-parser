import config from './../config';
import ArgType, { argTypesMap} from '../types/argTypes';
import './../extensions/string';

/** Argument object of usage's doc */
class Arg {
    /**
     * The full name of the argument
     * @type {?string}
     */
    longName?: string = undefined;

    /**
     * The short name of the argument
     * @type {?string}
     */
    shortName?: string = undefined;

    /**
     * The description of the argument
     * @type {?string}
     */
    description? : string = undefined;

    /**
     * The type of argument
     * @type {ArgType | undefined}
     */
    type: ArgType | undefined = undefined;

    /**
     * Possible values of argument
     * @type {?string[]}
     */
    values?: string[] = undefined;

    /**
     * The default value of argument
     * @type {?string}
     */
    default?: string = undefined;

    /**
     * If argument is required
     * @type {?boolean}
     */
    required?: boolean = undefined;

    /**
     * Whether argument has value
     * @type {?boolean}
     */
    hasValue?: boolean = undefined;

    /**
     * The delimiter of argument
     * @type {?string}
     */
    delimiter?: string = undefined;

    /**
     * If arguments is deprecated
     * @type {?boolean}
     */
    deprecated?: boolean = undefined;

    /**
     * @constructor
     * @param {string | undefined} argLine - Part of origin string with argument names (without description)
     * @param {string } descLine - Part of origin string with only description
     * @param {string } originLine - Origin string with argument names and description
     */
    constructor(argLine: string | undefined, descLine: string, originLine: string) {
        this.longName = config.reg.arg.long.firstMatch(argLine);
        this.shortName = config.reg.arg.short.firstMatch(argLine);
        this.description = descLine;

        this.values = this.getValues(originLine, config.reg.enums.values);
        this.default = config.reg.default.firstMatch(descLine);
        this.required = config.reg.required.firstMatch(argLine) ? true : false;
        this.delimiter = config.reg.delimiter.firstMatch(argLine);
        this.deprecated = config.reg.deprecated.firstMatch(descLine) ? true : false;

        this.type =  this.values !== undefined ? ArgType.string :
            this.getType(this.default ? typeof this.default.convert() : argLine);

        if (this.type === undefined || this.default === 'true' || this.default === 'false')  {
            this.hasValue = true;
            this.type = undefined;
        }
    }

    /**
     * Create instance of Arg object by single line
     * @param {string} line - Single line with argument and description
     * @return {Arg} Arg object
     */
    static create(line: string) : Arg {
        //TODO: 1 (trim) + 1 (split) + 1 (filter) + 1 (argsL:true) + 1 (argsL:undefined ) + 1 (descL.unify) + 1 (arg)
        const cleanLine = line.trimEnd(config.settings.trimEnd);
        const parts = cleanLine
            .split(config.reg.tabulation)
            .filter((x) => x !== String.Empty);

        const argsLine = parts[0].includes(config.reg.arg.start) ? parts.shift() : undefined;
        const descLine = parts.join(config.settings.line.join).unify();
        const arg = new Arg(argsLine, descLine, cleanLine);
        return arg;
    }

    /**
     * Try to identify type of argument by string of argument
     * @param {string | undefined} line - String with argument (without description)
     * @return {ArgType | undefined} Possible type of argument
     */
    private getType(line: string | undefined ) : ArgType | undefined {
        if (!line) { return undefined; }
        for (const [key, value] of argTypesMap) {
            if(value.some((item) => line.toLowerCase().includes(item))) {
                return key;
            }
        }
        return undefined;
    }

    /**
     * Get values of arguments by origin string and return it in array strings
     * @param {string | undefined} line - String with argument and description
     * @param {string} reg - String for RegExp which can be identify possible values of argument. Should be save only first match
     * @return {string[] | undefined} Array strings or undefined. Undefined if values cannot identify
     */
    private getValues(line: string | undefined, reg: string) : string[] | undefined {
        //const valuesLine = Arg.firstMatch(line, reg);
        const valuesLine = reg.firstMatch(line);
        const valuesArray = valuesLine ? valuesLine
            .split(config.reg.enums.split)
            .filter((x) => x !== String.Empty) : undefined;
        return valuesArray;
    }
}

export default Arg;
