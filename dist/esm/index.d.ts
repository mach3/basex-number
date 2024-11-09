/**
 * BaseXNumber
 * @constructor
 * @param {string[]} map
 */
export declare class BaseXNumber {
    map: string[];
    constructor(map?: string[]);
    /**
     * Encode number to string
     * @param {number} input
     * @param {Function} callback
     * @returns {string}
     */
    encode(input: number, callback?: (value: string) => string): string;
    /**
     * Decode string to number
     * @param {string} input
     * @param {Function} callback
     * @returns {number}
     */
    decode(input: string, callback?: (value: string) => string): number;
}
