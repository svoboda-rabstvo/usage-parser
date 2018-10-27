import config from './../config';

/**
 * Possible type of argument
 * @enum {string}
 * @type {enum}
 */
enum ArgType {
    string = 'string',
    number = 'number',
    boolean = 'bollean',
    object = 'object',
    array = 'array',
}

/**
 * Map which include type of argument and his aliases
 * @type {Map<ArgType, string[]>}
 */
const argTypesMap = new Map<ArgType, string[]>([
    [ArgType.string, config.types.string],
    [ArgType.number, config.types.number],
    [ArgType.boolean, config.types.boolean],
    [ArgType.array, config.types.array],
    [ArgType.object,config.types.object]
]);

export default ArgType;
export { argTypesMap };
