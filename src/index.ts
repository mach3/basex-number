const DEFAULT_BASE_MAP = Array.from(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
);

/**
 * Random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get shuffled map
 * @param {string[]} map
 * @param {number} count
 * @returns {string[]}
 */
function shuffle(map: string[], count: number): string[] {
  let i = count;
  const result = [...map];
  while (i--) {
    const temp = [];
    let end = false;
    for (const s of result) {
      if (end) {
        temp.push(s);
      } else {
        temp.unshift(s);
      }
      end = !end;
    }
    result.splice(0, result.length, ...temp);
  }
  return result;
}

/**
 * Default encode callback
 * @param {string} value
 * @returns {string}
 */
function defaultEncodeCallback(value: string): string {
  return btoa(value).replace(/=/g, "");
}

/**
 * Default decode callback
 * @param {string} value
 * @returns {string}
 */
function defaultDecoeCallback(value: string): string {
  return atob(value);
}

/**
 * BaseXNumber
 * @constructor
 * @param {string[]} map
 */
export class BaseXNumber {
  map: string[];

  constructor(map: string[] = DEFAULT_BASE_MAP) {
    this.map = map;
  }

  /**
   * Encode number to string
   * @param {number} input
   * @param {Function} callback
   * @returns {string}
   */
  encode(
    input: number,
    callback: (value: string) => string = defaultEncodeCallback,
  ): string {
    let value = input + 1024;
    const count = random(0, this.map.length - 1);
    const map = shuffle(this.map, count);
    const result = [this.map.at(count)];

    while (value > 0) {
      result.push(map[value % this.map.length]);
      value = Math.floor(value / this.map.length);
    }

    return callback(result.join(""));
  }

  /**
   * Decode string to number
   * @param {string} input
   * @param {Function} callback
   * @returns {number}
   */
  decode(
    input: string,
    callback: (value: string) => string = defaultDecoeCallback,
  ): number {
    const value = callback(input);
    const count = this.map.indexOf(value[0]);
    const map = shuffle(this.map, count);
    let result = 0;

    for (let i = 1; i < value.length; i++) {
      result += map.indexOf(value[i]) * this.map.length ** (i - 1);
    }

    return result - 1024;
  }
}
