import {Arg} from './arg';

/** The section with arguments of usage's doc */
export class Section {

    /**
     * Name of section
     * @type {string | undefined}
     */
    name?: string | undefined;

    /**
     * Array of arguments
     * @type {Arg[]}
     */
    args: Arg[];

    /**
     * @constructor
     * @param {string | undefined} name - The name of section
     * @param {Arg[]} args - The array of arguments
     */
    constructor(name: string | undefined, args: Arg[]) {
        this.name = name;
        this.args = args;
    }

    /**
     * Create the section with arguments of usage's doc
     * @param {string | undefined} name - The name of section
     * @param {Arg[]} args - The array of arguments
     * @return {Section} - The Section
     */
    static create(name: string | undefined, args: Arg[]) : Section {
        return new Section(name, args);
    }
}
