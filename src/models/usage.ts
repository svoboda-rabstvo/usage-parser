import Section from './section';
import config from './../config';
import './../extensions/string';
import Arg from './arg';

class Group {
    name: string | undefined;
    lines: string[];
    constructor(name : string | undefined, lines: string[] = []){
        this.name = name;
        this.lines = lines;
    }

    addLine(line: string | undefined) : Group {
        if (!line) { return this; }
        const readyLine = line.includes(config.reg.arg.start) ?
            line : this.lines.pop() + config.settings.line.join + line;
        this.lines.push(readyLine);
        return this;
    }

    static create(name: string | undefined = undefined, line : string | undefined = undefined) : Group {
        const group = new Group(name).addLine(line);
        return group;
    }
}
/**
 * Global Object which describe arguments with properties and sections for they
 */
class Usage {
    /**
     * Array of Sections object
     * @type {Section[]}
     */
    sections?: Section[];

    /**
     * Global delimiter of usage's doc
     * @type {?string | undefined}
     */
    delimiter?: string | undefined = undefined;

    /**
     * @constructor
     * @param {Section[]} sections - Array of Sections object
     */
    constructor(sections: Section[], delimiter: string | undefined = undefined) {
        this.sections = sections;
        this.delimiter = delimiter;
    }

    static groups = (lines: string[]) : Group[] | undefined => {
        const groups : Group[] = [];

        lines.forEach((line) => {
            const section = config.reg.section.firstMatch(line);
            if (section || !groups.length) {
                groups.push(Group.create(section || undefined, line));
            } else {
                groups[groups.length - 1].addLine(line);
            }
        });

        return groups.length ? groups : undefined;
    };

    static split = (input: string) : string[] => {
       return input
            .split(config.settings.line.breaker)
            .filter((x) => x !== String.Empty);
    };

    /**
     * Create instance of Usage by array of lines
     * @param {string} input - usage's doc with argument and sections
     * @return {Usage} Usage object
     */
    static create(input: string) : Usage | undefined {

        const delimiter = config.reg.delimiter.firstMatch(input);
        const lines = Usage.split(input);
        const groups = Usage.groups(lines);
        const sections : Section[] | undefined = groups ? groups
            .filter((item) => {
                const blockedSections = new RegExp(config.settings.blackList.section.join('|'), 'i');
                return item.name ? !(item.name.search(blockedSections) !== -1) : true;
            })
            .map((item) => Section.create(item.name, item.lines)) : undefined;
        const usage =  sections ? new Usage(sections, delimiter) : undefined;
        return usage;
    }
}

export default Usage;
