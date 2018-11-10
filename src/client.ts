import {Group} from './models/group';
import {Usage} from './models/usage';
import {config} from './config';
import {Section} from './models/section';
import {UsageFactory} from './factory/UsageFactory';

import './extensions/string';

/**
 * The client for convert input string to Usage
 */
class Client {

    /**
     * The Factory of Usage
     * @type {UsageFactory}
     */
    factory: UsageFactory;

    /**
     * The Input string
     * @type {string}
     */
    input : string;

    /**
     * @constructor
     * @param {string}  input - The input string for convert
     * @param {UsageFactory}  [factory="UsageFactory"] - The factory of Usage, default is `UsageFactory`
     */
    constructor(input: string, factory: UsageFactory = new UsageFactory()){
        this.input = input;
        this.factory = factory;
    }

    /**
     * Split input by regExp from config and returns array of lines
     * @param input - input via string
     * @return {string[]} - The array of lines
     */
    private splitLine (input: string) {
        const linesArray = input.split(config.settings.line.breaker);
        const linesClear = linesArray.filter((x) => x !== String.Empty);
        return linesClear;
    }

    /**
     * Create groups from lines, where identity of group is regExp from config
     * @param linesClear - The array of lines
     * @return {Group[]} - The array of groups
     */
    private createGroups (linesClear: string[]) : Group[] {
        return linesClear.reduce((acum, line) => {
            const section = config.reg.section.firstMatch(line);
            if (section || !acum.length) {
                acum.push(Group.create(section || undefined));
            } else {
                acum[acum.length - 1].addLine(line);
            }
            return acum;
        }, Array<Group>());
    }

    /**
     * Create sections from groups
     * @param groupsArray - The array of groups
     * @return {Section[]} - The array of sections
     */
    private createSections (groupsArray: Group[]) : Section[] {
        return groupsArray.reduce((acum, group) => {
            const argsArray = group.lines.map((line) => this.factory.argument(line));
            if (argsArray.length) {
                const section = this.factory.section(argsArray, group.name);
                acum.push(section);
            }
            return acum;
        }, Array<Section>());
    }

    /**
     * Try to convert input string to Usage
     * @return {Usage} - The Usage with sections and arguments
     */
    create() : Usage | undefined {
        const delimiter = config.reg.delimiter.firstMatch(this.input);

        const lines = this.splitLine(this.input);
        const groups = this.createGroups(lines);
        const sections = this.createSections(groups);

        const usage = sections.length ? this.factory.usage(sections, delimiter) : undefined;
        return usage;
    }
}
export {Client};
