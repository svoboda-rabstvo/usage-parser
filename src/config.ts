export const config  = {
    settings: {
        trimEnd: '.',
        blackList: {
            section: ['example'],
            args: [undefined],
        },
        line: {
            breaker: /\n|\r/gim,
            join: '  ',
        }
    },
    reg: {
        arg: {
            start: '-',
            long: '(--(?:\\w|-|$)*)',
            short: '(?:\\s|^)(-[^-]*?)(?:\\s|=|$|,)',
        },
        enums: {
            values: '(?:[<("])(([\\S]+([|,]|\\sor\\s|,\\s))+[\\S]{1,})(?:[>)"]|,\\s|$)',
            split: /\||<|>|\(|\)|\[|\]|\"|\'|,|\s|or/
        },
        section: '^(?:((?:\\w*\\s*){1,2})(?::|)|(?:\\w*\\s*){3,4}(?::))$',
        default: '(?:defaults*)(?:[:\'\"]|to|at|is|\\s){1,4}(.*?)(?:[[\\])\'\",]|\\s|$)',
        required: '(required)',
        delimiter: '[\\s]*[-]+[^ \t(\n|\r\n)]+(\\s|=)[^ :\t(\n|\r\n)-]',
        deprecated: '(deprecated)',
        tabulation: /\\s\\s|\\t|  /,
    },
    types: {
        string: [
            "string",
            "str",
            "dir",
            "directory",
            "path",
            "file"
        ],
        number: [
            "number",
            "integer",
            "int"
        ],
        array: [
            "array"
        ],
        object:  [
            "object"
        ],
        boolean: [
            "bool",
            "boolean"
        ],
    },
};
