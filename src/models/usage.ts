import {Section} from './section';

/**
 * The Usage is a Object which describe arguments with properties and sections for they
 */
export class Usage {
    /**
     * Array of Sections object
     * @type {Section[]}
     */
    sections: Section[];

    /**
     * Global delimiter of usage's doc
     * @type {?string | undefined}
     */
    delimiter?: string | undefined;

    /**
     * @constructor
     * @param {Section[]} sections - The array of Sections
     * @param {string | undefined} delimiter - The delimiter of usage
     */
    constructor(sections: Section[], delimiter: string | undefined) {
        this.delimiter = delimiter;
        this.sections = sections;
    }

    /**
     * Create The Usage which describe arguments with properties and sections for they
     * @param {Section[]} sections - The array of Sections
     * @param {string | undefined} delimiter - The delimiter of usage
     * @return {Usage} - The Usage
     */
    static create(sections: Section[], delimiter: string | undefined) : Usage {
        return new Usage(sections, delimiter);
    }
}
