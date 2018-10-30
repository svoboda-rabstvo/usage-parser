import config from './../config';

/**
 *
 */
class Group {
    name: string | undefined;
    lines: string[];
    constructor(name : string | undefined = undefined, lines: string[] = []){
        this.name = name;
        this.lines = lines;
    }

    static create(name: string | undefined, line : string) : Group {
        const group = new Group(name).addLine(line);
        return group;
    }

    addLine(
        line: string,
        identity : string = config.reg.arg.start,
        joinChar : string = config.settings.line.join) : Group {
        const readyLine = line.includes(identity) ?
            line : this.lines.pop() + joinChar + line;
        this.lines.push(readyLine);
        return this;
    }
}

export default Group;
