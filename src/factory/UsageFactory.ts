import {Arg} from '../models/arg';
import {Usage} from '../models/usage';
import {config} from './../config';
import {Section} from '../models/section';
import './../extensions/string';

/**
 * The Usage Factory is describe how to create main parts of client
 */
export class UsageFactory {

    /**
     * @constructor
     */
    constructor() {}

    /**
     * Create Argument from the line. The line is splitting to 2 parts before create Argument
     * @param {string} line - The line with argument, which needs to split
     * @return {Arg} - The Argument with properties
     */
    argument (line: string) : Arg {
        const cleanLine = line.trimEnd(config.settings.trimEnd);
        const parts = cleanLine
            .split(config.reg.tabulation)
            .filter((x) => x !== String.Empty);

        const argsLine = parts[0].includes(config.reg.arg.start) ? parts.shift() : undefined;
        const descLine = parts.join(config.settings.line.join).unify();
        const arg = Arg.create(argsLine, descLine);
        return arg;
    }

    /**
     * Create section with name and arguments, clear empty arguments
     * @param {Arg[]} args - The array of args for section
     * @param {string | undefined} [name="undefined"] - The name of section, default is `undefined`
     * @return {Section} - The section with args
     */
    section (args: Arg[], name: string | undefined = undefined) : Section {
        const argsClear = args.filter((arg) =>
            !(arg.longName === undefined && arg.shortName === undefined));
        const section = Section.create(name, argsClear);
        return section;
    }
    /**
     * Create Usage with section and delimiter, skip blocked sections
     * @param {Section[] } sections - The array of sections for Usage
     * @param {string | undefined} [delimiter="undefined"] - The delimiter of Usage, default is `undefined`
     * @return {Usage} - The Usage with delimiter and the array of sections
     */
    usage (sections: Section[], delimiter: string | undefined = undefined) : Usage {
        const ignoredSectionRegExp = new RegExp(config.settings.blackList.section.join('|'), 'i');
        const sectionsClear = sections.filter((item) => {
            return item.name ? item.name.search(ignoredSectionRegExp) === -1 : true;
        });
        const usage = Usage.create(sectionsClear, delimiter);
        return usage;
    }
}
