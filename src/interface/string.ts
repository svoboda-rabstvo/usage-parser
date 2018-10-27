interface String {
    /**
     * Unify string. Use trim and create first letter in uppercase.
     * @return - unification string
     */
    unify() : string;

    /**
     * Try convert string to number or boolean. Return value in that type.
     * @return - value in correct type: number, boolean or string
     */
    convert() : boolean | number | String;

    /**
     * Trim end
     * @param s - string
     * @return {string} - string without
     */
    trimEnd(s: string) : string;

    /**
     * Run RegExp for line and return first match if it exist.
     * @param s - String for search
     * @return {string | undefined } First match in string format of undefined
     */
    firstMatch(s: string | undefined): string | undefined;
}

interface StringConstructor {
    /** Empty string */
    Empty: string;
}
