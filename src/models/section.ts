import Arg from './arg';

/** Section with arguments of usage's doc */
class Section {

    /**
     * Name of section
     * @type {string | undefined}
     */
    name: string | undefined = undefined;

    /**
     * Array of arguments
     * @type {?Arg[]}
     */
    args?: Arg[] = undefined;

    /**
     * @constructor
     * @param {string | undefined} name - name of section
     * @param {Arg[] | undefined} [args="undefined"] - array of arguments
     * @param {string[] | undefined} [lines="undefined"] - array lines of section
     */
    constructor(name: string | undefined, args: Arg[] | undefined = undefined) {
        this.name = name;
        this.args = args;
    }

    static create(name: string | undefined, lines: string[] | undefined = undefined) : Section {
        const args = lines ? lines
            .map((line) => Arg.create(line))
            .filter((arg) => !(arg.longName === undefined && arg.shortName === undefined))
                : undefined;
        return new Section(name, args);
    }
}

export default Section;
