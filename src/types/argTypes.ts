import {config} from './../config';

/**
 * Possible type of argument
 * @type {enum}
 */
export enum ArgType {
    /**
     * The string
     * @type {string}
     */
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    object = 'object',
    array = 'array',
    undefined = 'undefined',
}

/**
 * Map which include type of argument and his aliases
 * @type {Map<ArgType, string[]>}
 */
export const argTypesMap = new Map<ArgType, string[]>([
    [ArgType.string, config.types.string],
    [ArgType.number, config.types.number],
    [ArgType.boolean, config.types.boolean],
    [ArgType.array, config.types.array],
    [ArgType.object,config.types.object]
]);

/**
 * Try to find ArgType in the line, default is `ArgType.undefined`
 * @param line - The line in which need to find ArgType
 * @return {ArgType} - The ArgType which find in line
 */
export const indetifyType = (line: string | undefined ) : ArgType  => {
    if (!line) { return ArgType.undefined; }
    for (const [key, value] of argTypesMap) {
        if (value.some((item) => line.toLowerCase().includes(item))) {
            return key;
        }
    }
    return ArgType.undefined;
};
