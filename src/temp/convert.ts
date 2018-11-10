import * as _ from 'lodash';
import {Usage} from '../models/usage';
import {Arg} from '../models/arg';
import {Section} from '../models/section';

/**
 * 8
 */
class ArguemntConvertor {
    /**
     * 1
     */
    description: string | undefined;
    /**
     * 2
     */
    id: string | undefined;
    /**
     * 3
     */
    enum?: string[];
    /**
     * 4
     */
    type?: string | null;
    /**
     * 5
     */
    default?: string;
    /**
     * 6
     */
    usage?: boolean;
    /**
     * 7
     */
    constructor(id: string | undefined, type: string | undefined, description: string | undefined){
        this.id = id;
        this.type = typeof type === 'undefined' ? null : type;
        this.description = description;
    }
}
const schema = require('./args.json');

export const convert = (usage: Usage | undefined) => {
    const template = _.cloneDeep(schema);
    const properties = template.definitions.arguments.properties;
    template.delimiter = usage!.delimiter ? usage!.delimiter : '=';
    if (usage!.sections) {
        usage!.sections!.map((section: Section) => {
            section.args.map((arg: Arg) => {
                const name = typeof arg.longName !== 'undefined' ? arg.longName : arg.shortName;
                const arguemnt = new ArguemntConvertor(name, arg.type, arg.description);

                switch (arguemnt.id) {
                    case '--version':
                        arguemnt.id = `linterhub:version`;
                        arguemnt.type = null;
                        break;
                    case '--help':
                        arguemnt.id = `linterhub:help`;
                        arguemnt.type = null;
                        break;
                    case '--config':
                        arguemnt.id = `linterhub:config`;
                        break;
                    case '--stdin':
                        arguemnt.id = `linterhub:stdin`;
                        arguemnt.type = 'string';
                        break;
                    case '--stdin-filename':
                    case '--stdin-filepath':
                        arguemnt.id = `linterhub:filename`;
                        break;
                    case '':
                        arguemnt.id = `linterhub:path`;
                        arguemnt.description = 'Path to file or folder to analyze';
                        break;
                    default:
                        arguemnt.id = (!arg.hasValue ? 'args:' : '') + arguemnt.id;
                        break;
                }

                if (typeof arg.default !==  'undefined') { arguemnt.default = arg.default; }
                if (arg.deprecated) { arguemnt.usage = !arg.deprecated; }
                if (arg.values) { arguemnt.enum = arg.values; }

                properties[name!] = arguemnt;
            });

        });
    }

    return template;
};
